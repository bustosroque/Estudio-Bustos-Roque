import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, consulta } = await request.json();
    if (!nombre || !email || !consulta) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const subject = `Nuevo mensaje de contacto rápido: ${nombre}`;
    const text = `
Nuevo mensaje desde el formulario de contacto rápido:

Nombre: ${nombre}
Email: ${email}
Consulta:
${consulta}
`;
    const html = `
      <div style="background: #153F35; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px 0;">
        <div style="max-width: 480px; margin: 0 auto; background: #1a4a3e; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden;">
          <div style="background: #153F35; padding: 24px 32px 16px 32px; text-align: center;">
            <h2 style="color: #D4AF37; font-size: 2rem; margin: 0 0 8px 0; font-family: serif;">Nuevo Mensaje de Contacto Rápido</h2>
            <p style="color: #fff; font-size: 1.1rem; margin: 0;">Estudio Jurídico <span style='color:#D4AF37;font-weight:bold;'>Bustos & Roque</span></p>
          </div>
          <div style="padding: 24px 32px; background: #1a4a3e;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Nombre:</td><td style="color:#fff;">${nombre}</td></tr>
              <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;">Email:</td><td style="color:#fff;">${email}</td></tr>
              <tr><td style="color:#D4AF37;font-weight:bold;padding:8px 0;vertical-align:top;">Consulta:</td><td style="color:#fff;white-space:pre-line;">${consulta}</td></tr>
            </table>
            <div style="margin-top: 24px; text-align: center;">
              <span style="display:inline-block; background: #D4AF37; color: #153F35; font-weight: bold; padding: 10px 24px; border-radius: 8px; font-size: 1.1rem;">Contacto rápido web</span>
            </div>
          </div>
          <div style="background: #153F35; color: #fff; text-align: center; padding: 16px 32px; font-size: 0.95rem; border-radius: 0 0 16px 16px;">
            <p style="margin: 0;">Este mensaje es automático. No responder a este correo.<br>Estudio Jurídico Bustos & Roque</p>
          </div>
        </div>
      </div>
    `;
    await transporter.sendMail({
      from: `Contacto Web <${process.env.SMTP_USER}>`,
      to: 'estudiojuridicobustosroque@gmail.com',
      subject,
      text,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
} 