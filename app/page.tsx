'use client';

import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MiniAlbum from '@/components/MiniAlbum';
import Reference from '@/components/Reference';

import { Navbar } from '@/components/ui/Navbar';

export default function WelcomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutUs />
      <MiniAlbum />
      <ContactUs />
      <Reference />
      <Footer />
    </div>
  );
}
