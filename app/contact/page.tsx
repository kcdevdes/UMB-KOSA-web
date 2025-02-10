/**
 * Contact Page
 * Allow users to send a message to the admin
 */

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
