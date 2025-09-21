import { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '@/lib/email/sendEmail';
import { ContactFormData } from '@/types/contact';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, message }: ContactFormData = req.body;

    try {
      await sendEmail({
        to: 'info@example.com',
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;