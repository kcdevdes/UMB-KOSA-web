/**
 * Contact Page
 * Allow users to send a message to the admin
 */
'use client';

import ContactUs from '@/components/ContactUs';
import Footer from '@/components/ui/Footer';
import MyNavbar from '@/components/ui/MyNavbar';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="w-full h-screen">
      <MyNavbar />
      <div className="bg-gray-100 py-24 sm:py-32 ">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 ">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl font-Shilla">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg/8 text-black">{t('description')}</p>
          </div>
          <ContactUs />
        </div>
      </div>
      <Footer />
    </div>
  );
}
