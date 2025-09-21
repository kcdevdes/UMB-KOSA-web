import nodemailer from 'nodemailer';

interface ContactFormData {
  name?: string;
  email: string;
  topic?: string;
  message: string;
}

interface SendEmailOptions {
  to: string | undefined;
  subject: string;
  text: string;
  replyTo?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465 || process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail({ to, subject, text, replyTo }: SendEmailOptions) {
  if (!to) {
    throw new Error('CONTACT_RECEIVER_EMAIL not configured');
  }

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject,
    text,
    replyTo,
  });
}

function buildMessageLines(values: Array<string | undefined>): string {
  return values.filter((value): value is string => Boolean(value)).join('\n');
}

export async function POST(req: Request) {
  const { name, email, topic, message }: ContactFormData = await req.json();

  if (!email || !message) {
    return new Response(JSON.stringify({ message: 'Email and message are required.' }), {
      status: 400,
    });
  }

  try {
    await sendEmail({
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: topic ? `New contact request: ${topic}` : `New contact form submission${name ? ` from ${name}` : ''}`,
      text: buildMessageLines([
        name ? `Name: ${name}` : undefined,
        `Email: ${email}`,
        topic ? `Topic: ${topic}` : undefined,
        `Message: ${message}`,
      ]),
      replyTo: email,
    });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email' }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email') ?? undefined;
  const topic = url.searchParams.get('topic') ?? undefined;
  const message = url.searchParams.get('message') ?? undefined;

  if (!email || !message) {
    return new Response(JSON.stringify({ message: 'Missing required email or message parameter.' }), {
      status: 400,
    });
  }

  try {
    await sendEmail({
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: topic ? `New contact request: ${topic}` : 'New contact request',
      text: buildMessageLines([
        email,
        topic,
        message,
      ]),
      replyTo: email,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending email' }), {
      status: 500,
    });
  }
}
