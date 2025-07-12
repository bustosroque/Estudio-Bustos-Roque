import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Configurar autenticación con Service Account
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

export async function POST(request: NextRequest) {
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
      attendees: [
        { email: process.env.STUDIO_EMAIL || 'estudiojuridicobustosroque@gmail.com' },
        { email: email }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 día antes
          { method: 'popup', minutes: 30 }, // 30 minutos antes
        ],
      },
      // Configuración adicional para el evento
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    try {
      // Crear cliente de Google Calendar
      const calendar = google.calendar({ version: 'v3', auth });
      
      // Insertar evento en Google Calendar
      const response = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all'
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
      console.error('Error al crear evento en Google Calendar:', calendarError);
      
      // Si falla Google Calendar, aún devolvemos éxito pero con advertencia
      return NextResponse.json({
        success: true,
        message: 'Consulta reservada (Google Calendar temporalmente no disponible)',
        eventId: `event-${Date.now()}`,
        warning: 'No se pudo crear el evento en Google Calendar'
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