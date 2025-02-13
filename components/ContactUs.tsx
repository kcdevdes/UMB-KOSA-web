'use client';

import { useState } from 'react';
import React from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ContactUs() {
  const [formData, setFormData] = useState({
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

    if (!formData.email) {
      setStatus('You need to enter your email address');
      return;
    }

    setStatus('Sending...');

    try {
      await addDoc(collection(db, 'contacts'), {
        sender: formData.email,
        message: formData.message,
        reply: '',
        sentAt: Timestamp.fromDate(new Date()),
        isAnswered: false,
      });

      setStatus('Message sent successfully!');
      setFormData({ email: '', message: '' });
    } catch (error) {
      console.error('Error saving message:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 h-auto flex flex-col justify-center">
      <div className="mx-auto max-w-7xl lg:px-8 items-center ">
        <div className="max-w-full p-4 bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message (English/Korean are both welcome)"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg h-32"
            />
            <button
              type="submit"
              className="w-full rounded-full text-white p-3 bg-korean-red hover:bg-red-800"
            >
              Send Carrier Pigeons!
            </button>
          </form>
          {status && <p className="text-center mt-4 text-gray-600">{status}</p>}
        </div>
      </div>
    </div>
  );
}
