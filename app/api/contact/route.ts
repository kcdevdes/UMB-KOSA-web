import {buildMessageLines, sendEmail} from '@/lib/email/sendEmail';
import type {ContactFormData} from '@/types/contact';

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
