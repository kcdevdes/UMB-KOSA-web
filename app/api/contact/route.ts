import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `📩 New Inquiry from ${name} - KOSA Contact Form`,
      text: `
      🔥 New Contact Form Submission 🔥
      
      📌 Name: ${name}
      📌 Email: ${email}
      
      📝 Message:
      ---------------------------------
      ${message}
      ---------------------------------
      
      📅 Submitted on: ${new Date().toLocaleString()}
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to send email', message: (error as Error).message },
      { status: 500 }
    );
  }
}
