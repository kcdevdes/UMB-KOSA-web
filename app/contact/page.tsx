/* eslint-disable @next/next/no-img-element */
import ContactUs from '@/components/ContactUs';
import MyNavbar from '@/components/ui/MyNavbar';

export default function ContactPage() {
  return (
    <div className="w-full h-screen">
      <MyNavbar />
      <ContactUs />
    </div>
  );
}
