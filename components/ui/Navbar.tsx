'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="w-full flex items-center justify-between p-4 bg-beacon-blue shadow-md opacity-100 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-4">
        <Image
          src="/images/kosa-logo.jpg"
          alt="KOSA Logo"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex items-center gap-4">
        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <AiOutlineClose size={32} className="text-white" />
            ) : (
              <AiOutlineMenu size={32} className="text-white" />
            )}
          </button>
        ) : (
          <div className="flex gap-6 mr-4">
            <Link href="/" className="text-lg text-white">
              Home
            </Link>

            <Link href="/about" className="text-lg  text-white">
              About
            </Link>

            <Link href="/gallery" className="text-lg  text-white">
              Gallery
            </Link>

            <Link href="/calendar" className="text-lg  text-white">
              Calendar
            </Link>
          </div>
        )}
      </div>
      {isMobile && menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
          <Link href="/" className="text-lg text-black">
            Home
          </Link>

          <Link href="/about" className="text-lg  text-black">
            About
          </Link>

          <Link href="/gallery" className="text-lg  text-black">
            Gallery
          </Link>

          <Link href="/calendar" className="text-lg  text-black">
            Calendar
          </Link>
        </div>
      )}
    </nav>
  );
};
