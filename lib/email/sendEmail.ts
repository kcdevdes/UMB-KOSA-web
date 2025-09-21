import nodemailer from 'nodemailer';

export type SendEmailOptions = {
  to?: string;
  subject: string;
  text: string;
  replyTo?: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465 || process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({to, subject, text, replyTo}: SendEmailOptions) {
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

export function buildMessageLines(values: Array<string | undefined>): string {
  return values.filter((value): value is string => Boolean(value)).join('\n');
}
