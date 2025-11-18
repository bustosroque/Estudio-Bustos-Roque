import { google } from 'googleapis';

/**
 * Configura la autenticación con Google Sheets usando Service Account
 */
export const getGoogleSheetsAuth = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  
  if (!privateKey || !clientEmail) {
    console.warn('⚠️ Google Sheets credentials not configured');
    return null;
  }

  try {
    // Limpiar y formatear la private key correctamente
    const cleanPrivateKey = privateKey
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/^["']|["']$/g, '');

    return new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: cleanPrivateKey,
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
  } catch (error) {
    console.error('❌ Error configuring Google Sheets Auth:', error);
    return null;
  }
};

/**
 * Agrega un lead a Google Sheets
 * Crea automáticamente la hoja y los headers si no existen
 */
export const addLeadToSheet = async (leadData: {
  tipoProblema: string;
  obraSocial: string;
  urgencia: string;
  descripcion: string;
  nombre: string;
  telefono: string;
  email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  timestamp: string;
  ip: string;
}) => {
  const auth = getGoogleSheetsAuth();
  
  if (!auth) {
    console.warn('⚠️ Google Sheets not configured, skipping sheet write');
    return { success: false, error: 'Google Sheets not configured' };
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!spreadsheetId) {
    console.warn('⚠️ GOOGLE_SHEET_ID not configured');
    return { success: false, error: 'Sheet ID not configured' };
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });

    // Verificar si la hoja "Leads" existe y crear headers si es necesario
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId,
      });

      const sheetExists = spreadsheet.data.sheets?.some(
        sheet => sheet.properties?.title === 'Leads'
      );

      // Si la hoja no existe, crearla
      if (!sheetExists) {
        console.log('📝 Creando hoja "Leads"...');
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: 'Leads',
                  },
                },
              },
            ],
          },
        });
        console.log('✅ Hoja "Leads" creada');
      }

      // Verificar si hay headers
      let headersExist = false;
      try {
        const headersResponse = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Leads!A1:O1',
        });
        headersExist = !!(headersResponse.data.values && headersResponse.data.values.length > 0);
      } catch (e) {
        // Si hay error, asumimos que no hay headers
        headersExist = false;
      }

      // Si no hay headers, crearlos
      if (!headersExist) {
        console.log('📝 Creando headers en la hoja...');
        const headers = [
          'Fecha y Hora',
          'Nombre',
          'Teléfono',
          'Email',
          'Tipo de Problema',
          'Obra Social/Prepaga',
          'Urgencia',
          'Descripción',
          'UTM Source',
          'UTM Medium',
          'UTM Campaign',
          'UTM Term',
          'UTM Content',
          'IP',
        ];

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Leads!A1:N1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [headers],
          },
        });

        // Formatear headers (negrita y color)
        const leadsSheet = spreadsheet.data.sheets?.find(s => s.properties?.title === 'Leads');
        if (leadsSheet?.properties?.sheetId !== undefined) {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [
                {
                  repeatCell: {
                    range: {
                      sheetId: leadsSheet.properties.sheetId,
                      startRowIndex: 0,
                      endRowIndex: 1,
                      startColumnIndex: 0,
                      endColumnIndex: 14,
                    },
                    cell: {
                      userEnteredFormat: {
                        textFormat: {
                          bold: true,
                        },
                        backgroundColor: {
                          red: 0.2,
                          green: 0.4,
                          blue: 0.6,
                        },
                      },
                    },
                    fields: 'userEnteredFormat.textFormat.bold,userEnteredFormat.backgroundColor',
                  },
                },
              ],
            },
          });
        }

        console.log('✅ Headers creados y formateados');
      }
    } catch (initError) {
      console.warn('⚠️ Error al verificar/inicializar hoja:', initError);
      // Continuar de todas formas, intentar agregar el lead
    }

    // Preparar los datos en el orden de las columnas
    const row = [
      leadData.timestamp, // Fecha y hora
      leadData.nombre,
      leadData.telefono,
      leadData.email || '',
      leadData.tipoProblema,
      leadData.obraSocial,
      leadData.urgencia,
      leadData.descripcion,
      leadData.utm_source || '',
      leadData.utm_medium || '',
      leadData.utm_campaign || '',
      leadData.utm_term || '',
      leadData.utm_content || '',
      leadData.ip,
    ];

    // Agregar la fila a la hoja
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:N', // Rango que incluye todas las columnas (14 columnas)
      valueInputOption: 'USER_ENTERED', // Permite que Google Sheets interprete los valores
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Lead agregado a Google Sheets:', response.data.updates?.updatedRows);
    
    return { 
      success: true, 
      updatedRows: response.data.updates?.updatedRows,
      updatedRange: response.data.updates?.updatedRange,
    };
  } catch (error) {
    console.error('❌ Error al agregar lead a Google Sheets:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Crea los headers de la hoja si no existen
 */
export const initializeSheet = async () => {
  const auth = getGoogleSheetsAuth();
  
  if (!auth) {
    return { success: false, error: 'Google Sheets not configured' };
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!spreadsheetId) {
    return { success: false, error: 'Sheet ID not configured' };
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });

    // Verificar si la hoja "Leads" existe
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties?.title === 'Leads'
    );

    if (!sheetExists) {
      // Crear la hoja "Leads"
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Leads',
                },
              },
            },
          ],
        },
      });
    }

    // Verificar si hay headers
    const headersResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A1:O1',
    });

    if (!headersResponse.data.values || headersResponse.data.values.length === 0) {
      // Agregar headers
      const headers = [
        'Fecha y Hora',
        'Nombre',
        'Teléfono',
        'Email',
        'Tipo de Problema',
        'Obra Social/Prepaga',
        'Urgencia',
        'Descripción',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'UTM Term',
        'UTM Content',
        'IP',
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Leads!A1:O1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });

      // Formatear headers (negrita)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: spreadsheet.data.sheets?.find(s => s.properties?.title === 'Leads')?.properties?.sheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 14,
                },
                cell: {
                  userEnteredFormat: {
                    textFormat: {
                      bold: true,
                    },
                    backgroundColor: {
                      red: 0.2,
                      green: 0.4,
                      blue: 0.6,
                    },
                  },
                },
                fields: 'userEnteredFormat.textFormat.bold,userEnteredFormat.backgroundColor',
              },
            },
          ],
        },
      });

      console.log('✅ Headers creados en Google Sheets');
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Error al inicializar Google Sheets:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

