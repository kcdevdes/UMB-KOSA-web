'use client';

import Intro from '@/components/AboutUs';
import Hero from '@/components/Hero';
import { Navbar } from '@/components/ui/Navbar';
import { Parallax } from 'react-scroll-parallax';

export default function WelcomePage() {
  return (
    <div>
      <Navbar />
      <Parallax speed={-100}>
        <Hero />
      </Parallax>
      <Intro />
    </div>
  );
}
