import { NextRequest, NextResponse } from 'next/server';
import { addLeadToSheet } from '@/lib/google-sheets';

interface LeadData {
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
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();
    
    // Validar campos requeridos
    if (!data.nombre || !data.telefono || !data.tipoProblema || !data.obraSocial || !data.urgencia) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Formatear mensaje para Telegram
    const telegramMessage = `
🆕 *NUEVO LEAD - Obra Social/Prepaga*

👤 *Nombre:* ${data.nombre}
📞 *Teléfono:* ${data.telefono}
${data.email ? `📧 *Email:* ${data.email}` : ''}

🏥 *Problema:* ${data.tipoProblema}
🏢 *Obra Social/Prepaga:* ${data.obraSocial}
⚡ *Urgencia:* ${data.urgencia}

📝 *Descripción:*
${data.descripcion || 'Sin descripción'}

${data.utm_source ? `📊 *UTM Source:* ${data.utm_source}` : ''}
${data.utm_medium ? `📊 *UTM Medium:* ${data.utm_medium}` : ''}
${data.utm_campaign ? `📊 *UTM Campaign:* ${data.utm_campaign}` : ''}

⏰ *Fecha:* ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
`;

    // Obtener bot token y chat ID de variables de entorno
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Si hay configuración de Telegram, enviar mensaje
    if (botToken && chatId) {
      try {
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: 'Markdown',
          }),
        });

        if (!response.ok) {
          console.error('Error al enviar a Telegram:', await response.text());
        }
      } catch (telegramError) {
        console.error('Error en la petición a Telegram:', telegramError);
      }
    } else {
      // Si no hay configuración de Telegram, solo loguear
      console.log('=== NUEVO LEAD ===');
      console.log(telegramMessage);
      console.log('==================');
    }

    // Preparar datos del lead
    const leadRecord = {
      ...data,
      timestamp: new Date().toLocaleString('es-AR', { 
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    };

    // Log para desarrollo
    console.log('Lead recibido:', JSON.stringify(leadRecord, null, 2));

    // Guardar en Google Sheets
    try {
      const sheetResult = await addLeadToSheet(leadRecord);
      if (sheetResult.success) {
        console.log('✅ Lead guardado en Google Sheets');
      } else {
        console.warn('⚠️ No se pudo guardar en Google Sheets:', sheetResult.error);
      }
    } catch (sheetError) {
      console.error('❌ Error al guardar en Google Sheets:', sheetError);
      // Continuar aunque falle Google Sheets (no queremos perder el lead)
    }

    return NextResponse.json({
      success: true,
      message: 'Lead registrado correctamente',
    });
  } catch (error) {
    console.error('Error al procesar el lead:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

