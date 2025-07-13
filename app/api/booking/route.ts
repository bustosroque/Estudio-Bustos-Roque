import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Configurar autenticación con Service Account
const getGoogleAuth = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  
  console.log('🔍 Debugging Google Auth:');
  console.log('- Client Email exists:', !!clientEmail);
  console.log('- Private Key exists:', !!privateKey);
  console.log('- Private Key length:', privateKey?.length || 0);
  
  if (!privateKey || !clientEmail) {
    console.warn('❌ Google Calendar credentials not configured');
    console.log('Missing:', {
      clientEmail: !clientEmail,
      privateKey: !privateKey
    });
    return null;
  }

  try {
    // Limpiar y formatear la private key correctamente
    const cleanPrivateKey = privateKey
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/^["']|["']$/g, ''); // Remover comillas del inicio y final si existen

    console.log('✅ Private key cleaned successfully');
    console.log('Private key starts with:', cleanPrivateKey.substring(0, 50) + '...');

    return new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: cleanPrivateKey,
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
  } catch (error) {
    console.error('❌ Error configuring Google Auth:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return null;
  }
};

// Función para obtener el Calendar ID correcto
const getCalendarId = () => {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  
  if (calendarId && calendarId !== 'primary') {
    return calendarId;
  }
  
  // Si no está configurado, usar el email del estudio
  return process.env.STUDIO_EMAIL || 'estudiojuridicobustosroque@gmail.com';
};

export async function POST(request: NextRequest) {
  console.log('📞 POST /api/booking recibido');
  console.log('🔍 Variables de entorno disponibles:');
  console.log('- GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.log('- GOOGLE_PRIVATE_KEY:', !!process.env.GOOGLE_PRIVATE_KEY);
  console.log('- GOOGLE_PROJECT_ID:', !!process.env.GOOGLE_PROJECT_ID);
  console.log('- GOOGLE_CLIENT_ID:', !!process.env.GOOGLE_CLIENT_ID);
  
  try {
    const body = await request.json();
    const {
      nombre,
      email,
      telefono,
      tipoConsulta,
      abogado,
      fecha,
      hora,
      descripcion,
      modalidad
    } = body;

    // Validar datos requeridos
    if (!nombre || !email || !telefono || !tipoConsulta || !abogado || !fecha || !hora) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Crear fecha de inicio y fin
    const startDateTime = new Date(fecha);
    const [hours, minutes] = hora.split(':').map(Number);
    startDateTime.setHours(hours, minutes, 0, 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // 1 hora de duración

    // Mapear tipos de consulta a etiquetas legibles
    const consultationTypeLabels: { [key: string]: string } = {
      'amparos-salud': 'Amparos de Salud',
      'penal': 'Derecho Penal',
      'civil': 'Derecho Civil',
      'accidentes': 'Accidentes y ART',
      'tributario': 'Derecho Tributario',
      'laboral': 'Derecho Laboral'
    };

    // Crear evento para Google Calendar
    const event = {
      summary: `Consulta Legal - ${consultationTypeLabels[tipoConsulta] || tipoConsulta}`,
      description: `
Cliente: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Tipo de Consulta: ${consultationTypeLabels[tipoConsulta] || tipoConsulta}
Abogado: ${abogado}
Modalidad: ${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}
Descripción: ${descripcion || 'Sin descripción adicional'}

Reserva realizada desde el sitio web de Bustos & Roque
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires',
      },
      // Removemos attendees para evitar el error de Domain-Wide Delegation
      // attendees: [
      //   { email: process.env.STUDIO_EMAIL || 'estudiojuridicobustosroque@gmail.com' },
      //   { email: email }
      // ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 día antes
          { method: 'popup', minutes: 30 }, // 30 minutos antes
        ],
      },
      // Configuración adicional para el evento (removida para evitar problemas)
      // conferenceData: {
      //   createRequest: {
      //     requestId: `booking-${Date.now()}`,
      //     conferenceSolutionKey: {
      //       type: 'hangoutsMeet'
      //     }
      //   }
      // }
    };

    try {
      console.log('🚀 Iniciando proceso de reserva...');
      
      // Obtener autenticación de Google
      console.log('🔧 Configurando Google Auth...');
      const auth = getGoogleAuth();
      
      if (!auth) {
        console.warn('⚠️ Google Calendar not configured, skipping calendar integration');
        // Si no hay configuración de Google Calendar, continuar sin él
        const confirmationEmail = {
          to: email,
          subject: `Confirmación de Consulta - ${consultationTypeLabels[tipoConsulta] || tipoConsulta}`,
          body: `
Estimado/a ${nombre},

Su consulta ha sido reservada exitosamente:

📅 Fecha: ${new Date(fecha).toLocaleDateString('es-AR')}
🕐 Hora: ${hora}
👨‍💼 Abogado: ${abogado}
📍 Modalidad: ${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}
📋 Tipo: ${consultationTypeLabels[tipoConsulta] || tipoConsulta}

${modalidad === 'presencial' ? 
  '📍 Dirección: Córdoba Capital, Argentina' : 
  '📞 Le llamaremos al número proporcionado: ' + telefono
}

Recibirá un recordatorio 24 horas antes de la consulta.

Atentamente,
Estudio Jurídico Bustos & Roque
          `.trim()
        };

        return NextResponse.json({
          success: true,
          message: 'Consulta reservada exitosamente',
          eventId: `event-${Date.now()}`,
          confirmationEmail,
          note: 'Google Calendar no configurado'
        });
      }

      // Validar solapamiento de turnos
      const calendar = google.calendar({ version: 'v3', auth });
      const targetCalendarId = getCalendarId();
      console.log('📅 Usando Calendar ID:', targetCalendarId);

      // Buscar eventos en el rango solicitado
      const overlapRes = await calendar.events.list({
        calendarId: targetCalendarId,
        timeMin: startDateTime.toISOString(),
        timeMax: endDateTime.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });
      const overlapping = (overlapRes.data.items || []).some(ev =>
        ev.start?.dateTime && ev.end?.dateTime &&
        ((new Date(ev.start.dateTime) < endDateTime) && (new Date(ev.end.dateTime) > startDateTime))
      );
      if (overlapping) {
        return NextResponse.json({
          success: false,
          error: 'El horario seleccionado ya está ocupado. Por favor elige otro turno.'
        }, { status: 409 });
      }

      // Crear cliente de Google Calendar
      const response = await calendar.events.insert({
        calendarId: targetCalendarId,
        requestBody: event,
        sendUpdates: 'none' // Cambiado a 'none' para evitar problemas de permisos
      });

      console.log('Evento creado exitosamente:', response.data);

      // Enviar email de confirmación (aquí podrías integrar con SendGrid, Resend, etc.)
      const confirmationEmail = {
        to: email,
        subject: `Confirmación de Consulta - ${consultationTypeLabels[tipoConsulta] || tipoConsulta}`,
        body: `
Estimado/a ${nombre},

Su consulta ha sido reservada exitosamente:

📅 Fecha: ${new Date(fecha).toLocaleDateString('es-AR')}
🕐 Hora: ${hora}
👨‍💼 Abogado: ${abogado}
📍 Modalidad: ${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}
📋 Tipo: ${consultationTypeLabels[tipoConsulta] || tipoConsulta}

${modalidad === 'presencial' ? 
  '📍 Dirección: Córdoba Capital, Argentina' : 
  '📞 Le llamaremos al número proporcionado: ' + telefono
}

Recibirá un recordatorio 24 horas antes de la consulta.

Atentamente,
Estudio Jurídico Bustos & Roque
        `.trim()
      };

      console.log('Email de confirmación:', confirmationEmail);

      return NextResponse.json({
        success: true,
        message: 'Consulta reservada exitosamente',
        eventId: response.data.id,
        eventLink: response.data.htmlLink,
        confirmationEmail
      });

    } catch (calendarError) {
      console.error('💥 Error al crear evento en Google Calendar:', calendarError);
      console.error('📋 Error completo:', {
        name: calendarError instanceof Error ? calendarError.name : 'Unknown',
        message: calendarError instanceof Error ? calendarError.message : 'Unknown error',
        stack: calendarError instanceof Error ? calendarError.stack : undefined
      });
      
      // Si falla Google Calendar, aún devolvemos éxito pero con advertencia
      return NextResponse.json({
        success: true,
        message: 'Consulta reservada (Google Calendar temporalmente no disponible)',
        eventId: `event-${Date.now()}`,
        warning: 'No se pudo crear el evento en Google Calendar',
        error: calendarError instanceof Error ? calendarError.message : 'Error desconocido'
      });
    }

  } catch (error) {
    console.error('Error al procesar la reserva:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 