'use client';

import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MiniAlbum from '@/components/MiniAlbum';
import Reference from '@/components/Reference';
import MyNavbar from '@/components/ui/MyNavbar';

export default function WelcomePage() {
  return (
    <div>
      <MyNavbar />
      <Hero />
      <AboutUs />
      <MiniAlbum />
      <Footer />
    </div>
  );
}
