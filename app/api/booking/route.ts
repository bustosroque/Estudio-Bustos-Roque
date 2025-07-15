import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

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

// Función para enviar email a los abogados
async function notifyLawyers({ nombre, email, telefono, tipoConsulta, abogado, fecha, hora, descripcion, modalidad }: any) {
  const recipients = (process.env.LAWYERS_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
  if (recipients.length === 0) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `Nueva consulta reservada: ${nombre} (${tipoConsulta})`;
  const text = `
Nueva consulta reservada desde el sitio web:

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Tipo de Consulta: ${tipoConsulta}
Abogado: ${abogado}
Fecha: ${fecha}
Hora: ${hora}
Modalidad: ${modalidad}
Descripción: ${descripcion || 'Sin descripción'}
`;

  const html = `
  <div style="background: #153F35; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 0;">
    <div style="max-width: 480px; margin: 0 auto; background: #1a4a3e; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden;">
      <div style="background: #153F35; padding: 24px 32px 16px 32px; text-align: center;">
        <h2 style="color: #D4AF37; font-size: 2rem; margin: 0 0 8px 0; font-family: serif;">Nueva Consulta Reservada</h2>
        <p style="color: #fff; font-size: 1.1rem; margin: 0;">Estudio Jurídico <span style='color:#D4AF37;font-weight:bold;'>Bustos & Roque</span></p>
      </div>
      <div style="padding: 24px 32px; background: #1a4a3e;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Nombre:</td><td style="color:#fff;">${nombre}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Email:</td><td style="color:#fff;">${email}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Teléfono:</td><td style="color:#fff;">${telefono}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Tipo de Consulta:</td><td style="color:#fff;">${tipoConsulta}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Abogado:</td><td style="color:#fff;">${abogado}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Fecha:</td><td style="color:#fff;">${fecha}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Hora:</td><td style="color:#fff;">${hora}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Modalidad:</td><td style="color:#fff;">${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}</td></tr>
          <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;vertical-align:top;">Descripción:</td><td style="color:#fff;white-space:pre-line;">${descripcion || 'Sin descripción'}</td></tr>
        </table>
        <div style="margin-top: 24px; text-align: center;">
          <span style="display:inline-block; background: #D4AF37; color: #153F35; font-weight: bold; padding: 10px 24px; border-radius: 8px; font-size: 1.1rem;">Turno reservado correctamente</span>
        </div>
      </div>
      <div style="background: #153F35; color: #fff; text-align: center; padding: 16px 32px; font-size: 0.95rem; border-radius: 0 0 16px 16px;">
        <p style="margin: 0;">Este mensaje es automático. No responder a este correo.<br>Estudio Jurídico Bustos & Roque</p>
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `Reservas Bustos & Roque <${process.env.SMTP_USER}>`,
    to: recipients,
    subject,
    text,
    html,
  });
}

// Mapeo de abogados a correos (ajustar según tus LAWYERS_EMAILS)
const LAWYER_EMAIL_MAP: Record<string, string> = {
  'Diego Bustos': process.env.LAWYER_EMAIL_DIEGO || '',
  'José Roque': process.env.LAWYER_EMAIL_ROQUE || '',
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

    // Si NO hay fecha u hora, es una consulta inicial (no reserva)
    if (!fecha || !hora) {
      // Validar campos mínimos
      if (!nombre || !email || !telefono || !tipoConsulta || !abogado || !descripcion) {
        return NextResponse.json({ error: 'Faltan datos requeridos para la consulta inicial' }, { status: 400 });
      }
      // Email solo al abogado correspondiente
      let recipients: string[] = [];
      if (LAWYER_EMAIL_MAP[abogado]) {
        recipients = [LAWYER_EMAIL_MAP[abogado]];
      } else {
        // Fallback: todos los LAWYERS_EMAILS
        recipients = (process.env.LAWYERS_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
      }
      if (recipients.length === 0) {
        return NextResponse.json({ error: 'No hay destinatarios configurados para recibir consultas' }, { status: 500 });
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      const subject = `Nueva consulta inicial: ${nombre} (${tipoConsulta})`;
      const text = `\nNueva consulta inicial desde el sitio web:\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nTipo de Consulta: ${tipoConsulta}\nAbogado: ${abogado}\nModalidad: ${modalidad}\nDescripción: ${descripcion || 'Sin descripción'}\n`;
      const html = `
        <div style="background: #153F35; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 0;">
          <div style="max-width: 480px; margin: 0 auto; background: #1a4a3e; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden;">
            <div style="background: #153F35; padding: 24px 32px 16px 32px; text-align: center;">
              <h2 style="color: #D4AF37; font-size: 2rem; margin: 0 0 8px 0; font-family: serif;">Nueva Consulta Inicial</h2>
              <p style="color: #fff; font-size: 1.1rem; margin: 0;">Estudio Jurídico <span style='color:#D4AF37;font-weight:bold;'>Bustos & Roque</span></p>
            </div>
            <div style="padding: 24px 32px; background: #1a4a3e;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Nombre:</td><td style="color:#fff;">${nombre}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Email:</td><td style="color:#fff;">${email}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Teléfono:</td><td style="color:#fff;">${telefono}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Tipo de Consulta:</td><td style="color:#fff;">${tipoConsulta}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Abogado:</td><td style="color:#fff;">${abogado}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Modalidad:</td><td style="color:#fff;">${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;vertical-align:top;">Descripción:</td><td style="color:#fff;white-space:pre-line;">${descripcion || 'Sin descripción'}</td></tr>
              </table>
              <div style="margin-top: 24px; text-align: center;">
                <span style="display:inline-block; background: #D4AF37; color: #153F35; font-weight: bold; padding: 10px 24px; border-radius: 8px; font-size: 1.1rem;">Consulta inicial recibida</span>
              </div>
            </div>
            <div style="background: #153F35; color: #fff; text-align: center; padding: 16px 32px; font-size: 0.95rem; border-radius: 0 0 16px 16px;">
              <p style="margin: 0;">Este mensaje es automático. No responder a este correo.<br>Estudio Jurídico Bustos & Roque</p>
            </div>
          </div>
        </div>
      `;
      await transporter.sendMail({
        from: `Consultas Bustos & Roque <${process.env.SMTP_USER}>`,
        to: recipients,
        subject,
        text,
        html,
      });
      // Email de confirmación al cliente
      const clientSubject = `Confirmación de recepción de tu consulta - Bustos & Roque`;
      const clientText = `Hola ${nombre},\n\nHemos recibido tu consulta legal y nuestro equipo la evaluará a la brevedad.\n\nResumen de tu mensaje:\n- Nombre: ${nombre}\n- Email: ${email}\n- Teléfono: ${telefono}\n- Tipo de Consulta: ${tipoConsulta}\n- Abogado: ${abogado}\n- Modalidad: ${modalidad}\n- Descripción: ${descripcion || 'Sin descripción'}\n\nGracias por confiar en Bustos & Roque. Nos pondremos en contacto contigo pronto.`;
      const clientHtml = `
        <div style="background: #153F35; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 0;">
          <div style="max-width: 480px; margin: 0 auto; background: #1a4a3e; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden;">
            <div style="background: #153F35; padding: 24px 32px 16px 32px; text-align: center;">
              <h2 style="color: #D4AF37; font-size: 2rem; margin: 0 0 8px 0; font-family: serif;">¡Consulta recibida!</h2>
              <p style="color: #fff; font-size: 1.1rem; margin: 0;">Estudio Jurídico <span style='color:#D4AF37;font-weight:bold;'>Bustos & Roque</span></p>
            </div>
            <div style="padding: 24px 32px; background: #1a4a3e;">
              <p style="color:#fff;">Hola <b>${nombre}</b>,<br>Hemos recibido tu consulta legal y nuestro equipo la evaluará a la brevedad.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Nombre:</td><td style="color:#fff;">${nombre}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Email:</td><td style="color:#fff;">${email}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Teléfono:</td><td style="color:#fff;">${telefono}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Tipo de Consulta:</td><td style="color:#fff;">${tipoConsulta}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Abogado:</td><td style="color:#fff;">${abogado}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Modalidad:</td><td style="color:#fff;">${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}</td></tr>
                <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;vertical-align:top;">Descripción:</td><td style="color:#fff;white-space:pre-line;">${descripcion || 'Sin descripción'}</td></tr>
              </table>
              <div style="margin-top: 24px; text-align: center;">
                <span style="display:inline-block; background: #D4AF37; color: #153F35; font-weight: bold; padding: 10px 24px; border-radius: 8px; font-size: 1.1rem;">Gracias por confiar en Bustos & Roque</span>
              </div>
            </div>
            <div style="background: #153F35; color: #fff; text-align: center; padding: 16px 32px; font-size: 0.95rem; border-radius: 0 0 16px 16px;">
              <p style="margin: 0;">Este mensaje es automático. No responder a este correo.<br>Estudio Jurídico Bustos & Roque</p>
            </div>
          </div>
        </div>
      `;
      await transporter.sendMail({
        from: `Bustos & Roque <${process.env.SMTP_USER}>`,
        to: email,
        subject: clientSubject,
        text: clientText,
        html: clientHtml,
      });
      return NextResponse.json({ success: true, message: 'Consulta inicial enviada correctamente' });
    }

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

      // En el flujo de reserva, notificar solo al abogado correspondiente
      let recipients: string[] = [];
      if (LAWYER_EMAIL_MAP[abogado]) {
        recipients = [LAWYER_EMAIL_MAP[abogado]];
      } else {
        recipients = (process.env.LAWYERS_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
      }
      // Notificar al abogado por email
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        const subject = `Nueva consulta reservada: ${nombre} (${tipoConsulta})`;
        const text = `\nNueva consulta reservada desde el sitio web:\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nTipo de Consulta: ${tipoConsulta}\nAbogado: ${abogado}\nFecha: ${fecha}\nHora: ${hora}\nModalidad: ${modalidad}\nDescripción: ${descripcion || 'Sin descripción'}\n`;
        const html = `
          <div style=\"background: #153F35; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 0;\">
            <div style=\"max-width: 480px; margin: 0 auto; background: #1a4a3e; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden;\">
              <div style=\"background: #153F35; padding: 24px 32px 16px 32px; text-align: center;\">
                <h2 style=\"color: #D4AF37; font-size: 2rem; margin: 0 0 8px 0; font-family: serif;\">Nueva Consulta Reservada</h2>
                <p style=\"color: #fff; font-size: 1.1rem; margin: 0;\">Estudio Jurídico <span style='color:#D4AF37;font-weight:bold;'>Bustos & Roque</span></p>
              </div>
              <div style=\"padding: 24px 32px; background: #1a4a3e;\">
                <table style=\"width: 100%; border-collapse: collapse;\">
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Nombre:</td><td style=\"color:#fff;\">${nombre}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Email:</td><td style=\"color:#fff;\">${email}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Teléfono:</td><td style=\"color:#fff;\">${telefono}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Tipo de Consulta:</td><td style=\"color:#fff;\">${tipoConsulta}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Abogado:</td><td style=\"color:#fff;\">${abogado}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Fecha:</td><td style=\"color:#fff;\">${fecha}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Hora:</td><td style=\"color:#fff;\">${hora}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;\">Modalidad:</td><td style=\"color:#fff;\">${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}</td></tr>
                  <tr><td style=\"color:#D4AF37;font-weight:bold;padding:8px 0;vertical-align:top;\">Descripción:</td><td style=\"color:#fff;white-space:pre-line;\">${descripcion || 'Sin descripción'}</td></tr>
                </table>
                <div style=\"margin-top: 24px; text-align: center;\">
                  <span style=\"display:inline-block; background: #D4AF37; color: #153F35; font-weight: bold; padding: 10px 24px; border-radius: 8px; font-size: 1.1rem;\">Turno reservado correctamente</span>
                </div>
              </div>
              <div style=\"background: #153F35; color: #fff; text-align: center; padding: 16px 32px; font-size: 0.95rem; border-radius: 0 0 16px 16px;\">
                <p style=\"margin: 0;\">Este mensaje es automático. No responder a este correo.<br>Estudio Jurídico Bustos & Roque</p>
              </div>
            </div>
          </div>
        `;
        await transporter.sendMail({
          from: `Reservas Bustos & Roque <${process.env.SMTP_USER}>`,
          to: recipients,
          subject,
          text,
          html,
        });
      } catch (err) {
        console.error('Error enviando email a abogados:', err);
      }

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

      // Email de confirmación al cliente
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        const clientSubject = `Confirmación de reserva de consulta - Bustos & Roque`;
        const clientText = `Hola ${nombre},\n\nTu consulta ha sido reservada exitosamente.\n\nResumen de tu reserva:\n- Fecha: ${new Date(fecha).toLocaleDateString('es-AR')}\n- Hora: ${hora}\n- Abogado: ${abogado}\n- Modalidad: ${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}\n- Tipo de Consulta: ${tipoConsulta}\n- Descripción: ${descripcion || 'Sin descripción'}\n\nRecibirás recordatorios automáticos antes de la consulta.\n\nGracias por confiar en Bustos & Roque.`;
        const clientHtml = `
          <div style="background: #153F35; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 0;">
            <div style="max-width: 480px; margin: 0 auto; background: #1a4a3e; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden;">
              <div style="background: #153F35; padding: 24px 32px 16px 32px; text-align: center;">
                <h2 style="color: #D4AF37; font-size: 2rem; margin: 0 0 8px 0; font-family: serif;">¡Reserva confirmada!</h2>
                <p style="color: #fff; font-size: 1.1rem; margin: 0;">Estudio Jurídico <span style='color:#D4AF37;font-weight:bold;'>Bustos & Roque</span></p>
              </div>
              <div style="padding: 24px 32px; background: #1a4a3e;">
                <p style="color:#fff;">Hola <b>${nombre}</b>,<br>Tu consulta ha sido reservada exitosamente. Recibirás recordatorios automáticos antes de la consulta.</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Fecha:</td><td style="color:#fff;">${new Date(fecha).toLocaleDateString('es-AR')}</td></tr>
                  <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Hora:</td><td style="color:#fff;">${hora}</td></tr>
                  <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Abogado:</td><td style="color:#fff;">${abogado}</td></tr>
                  <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Modalidad:</td><td style="color:#fff;">${modalidad === 'presencial' ? 'Presencial' : 'Llamada'}</td></tr>
                  <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Tipo de Consulta:</td><td style="color:#fff;">${tipoConsulta}</td></tr>
                  <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;vertical-align:top;">Descripción:</td><td style="color:#fff;white-space:pre-line;">${descripcion || 'Sin descripción'}</td></tr>
                </table>
                <div style="margin-top: 24px; text-align: center;">
                  <span style="display:inline-block; background: #D4AF37; color: #153F35; font-weight: bold; padding: 10px 24px; border-radius: 8px; font-size: 1.1rem;">Gracias por confiar en Bustos & Roque</span>
                </div>
              </div>
              <div style="background: #153F35; color: #fff; text-align: center; padding: 16px 32px; font-size: 0.95rem; border-radius: 0 0 16px 16px;">
                <p style="margin: 0;">Este mensaje es automático. No responder a este correo.<br>Estudio Jurídico Bustos & Roque</p>
              </div>
            </div>
          </div>
        `;
        await transporter.sendMail({
          from: `Bustos & Roque <${process.env.SMTP_USER}>`,
          to: email,
          subject: clientSubject,
          text: clientText,
          html: clientHtml,
        });
      } catch (err) {
        console.error('Error enviando email de confirmación al cliente:', err);
      }

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