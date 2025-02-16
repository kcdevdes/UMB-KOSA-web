/**
 * Main page of the application
 * Show the main content of the application
 */

'use client';

import AboutUs from '@/components/welcome/AboutUs';
import SimpleStat from '@/components/welcome/SimpleStat';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/welcome/Hero';
import MiniAlbum from '@/components/welcome/MiniAlbum';
import MyNavbar from '@/components/ui/MyNavbar';
import MemberInterview from '@/components/welcome/MemberInterview';
import Alias from '@/components/welcome/Alias';

export default function WelcomePage() {
  return (
    <div>
      <MyNavbar />
      <Hero />
      <AboutUs />
      <SimpleStat />
      <MiniAlbum />
      <MemberInterview />
      <Alias />
      <Footer />
    </div>
  );
}
