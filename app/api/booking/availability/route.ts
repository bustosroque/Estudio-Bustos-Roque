import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Reutilizamos la función de autenticación
const getGoogleAuth = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  if (!privateKey || !clientEmail) return null;
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
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
};

const getCalendarId = () => {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (calendarId && calendarId !== 'primary') return calendarId;
  return process.env.STUDIO_EMAIL || 'estudiojuridicobustosroque@gmail.com';
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // formato: YYYY-MM-DD
  if (!date) {
    return NextResponse.json({ error: 'Falta la fecha (date)' }, { status: 400 });
  }

  const auth = getGoogleAuth();
  if (!auth) {
    return NextResponse.json({ error: 'Google Calendar no configurado' }, { status: 500 });
  }

  const calendar = google.calendar({ version: 'v3', auth });
  const calendarId = getCalendarId();

  // Definir rango de la fecha (todo el día)
  const timeMin = new Date(date + 'T00:00:00-03:00').toISOString();
  const timeMax = new Date(date + 'T23:59:59-03:00').toISOString();

  try {
    const eventsRes = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const busySlots = (eventsRes.data.items || [])
      .filter(ev => ev.start?.dateTime && ev.end?.dateTime)
      .map(ev => ({
        start: ev.start!.dateTime!,
        end: ev.end!.dateTime!,
        summary: ev.summary || '',
      }));
    return NextResponse.json({ busy: busySlots });
  } catch (error) {
    console.error('Error consultando disponibilidad:', error);
    return NextResponse.json({ error: 'Error consultando Google Calendar' }, { status: 500 });
  }
} 