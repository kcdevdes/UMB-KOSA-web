import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@umb\.edu$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Only @umb.edu email addresses are allowed.');
      return;
    }

    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send email.');
      }
    } catch {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white h-auto flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center py-12 ">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-right">
            Need to contact? KOSA&apos;s ears are always open!
          </p>
        </div>
        <div className="font-thin text-lg lg:text-xl text-gray-500 mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl lg:text-center lindent-4">
          If you have any questions, or want to join KOSA, feel free to reach
          out. <br></br> 한국인분들은 언제나 환영해요! 부디 연락해주세요!
        </div>
        <div className="max-w-full p-4 mt-12 bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your UMB Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg h-32"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Send Carrier Pigeon!
            </button>
          </form>
          {status && <p className="text-center mt-4 text-gray-600">{status}</p>}
        </div>
      </div>
    </div>
  );
}
