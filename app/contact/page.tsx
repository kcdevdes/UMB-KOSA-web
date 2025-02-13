/**
 * Contact Page
 * Allow users to send a message to the admin
 */

import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import MyNavbar from '@/components/ui/MyNavbar';

export default function ContactPage() {
  return (
    <div className="w-full h-screen">
      <MyNavbar />
      <div className="bg-gray-100 py-24 sm:py-32 ">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 ">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
              Need To Contact Us?
            </h2>
            <p className="mt-6 text-lg/8 text-black">
              KOSA&apos;s ears are always open! Please reach out to us with your
              messages.
            </p>
            <p className="text-lg/8 text-black">
              한국분들은 언제나 환영해요! 부담없이 메시지 남겨주시면 빠르게
              답변드릴게요!
            </p>
          </div>
          <ContactUs />
        </div>
      </div>
      <Footer />
    </div>
  );
}
