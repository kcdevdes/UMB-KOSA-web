'use client';

import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/Contact';
import EventBriefing from '@/components/EventBriefing';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MiniAlbum from '@/components/MiniAlbum';
import Reference from '@/components/Resource';

import { Navbar } from '@/components/ui/Navbar';

export default function WelcomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutUs />
      <MiniAlbum />
      <EventBriefing />
      <ContactUs />
      <Reference />
      <Footer />
    </div>
  );
}
