/**
 * Main page of the application
 * Show the main content of the application
 */

'use client';

import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MiniAlbum from '@/components/MiniAlbum';
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
