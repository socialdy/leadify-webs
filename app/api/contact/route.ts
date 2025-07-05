import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, phone, subject, message } = data;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: 'Bitte füllen Sie alle erforderlichen Felder aus (Name, E-Mail, Betreff, Nachricht).' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // z.B. "smtp.your-email-service.com"
      port: parseInt(process.env.EMAIL_PORT || '587', 10), // z.B. 587 oder 465
      secure: process.env.EMAIL_SECURE === 'true', // true für Port 465, false für andere Ports wie 587
      auth: {
        user: process.env.EMAIL_USER, // Dein E-Mail-Benutzername
        pass: process.env.EMAIL_PASS, // Dein E-Mail-Passwort oder App-Passwort
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Senden von der E-Mail-Adresse, die vom SMTP-Server autorisiert ist
      to: "support@leadify.at",
      replyTo: `"${name}" <${email}>`, // Die ursprüngliche Absenderadresse für die Antwort verwenden
      subject: `Kontaktanfrage: ${subject}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>E-Mail:</b> ${email}</p><p><b>Telefon:</b> ${phone || 'Nicht angegeben'}</p><p><b>Nachricht:</b><br/>${message}</p>`,
    });

    console.log('Contact form data sent successfully to support@leadify.at');
    return NextResponse.json({ message: 'Nachricht erfolgreich gesendet!' }, { status: 200 });
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return NextResponse.json({ message: 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.' }, { status: 500 });
  }
} 