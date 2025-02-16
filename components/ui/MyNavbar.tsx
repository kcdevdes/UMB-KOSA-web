'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { useAuth } from '@/lib/hook/useAuth';
import Image from 'next/image';

export default function MyNavbar() {
  const { user } = useAuth();
  return (
    <Navbar
      fluid
      className="fixed z-50 *:overflow-hidden top-0 w-full shadow-lg bg-[#FAF6F5]"
    >
      <Navbar.Brand as={Link} href="/" className="flex items-center">
        <Image
          className="rounded-full"
          src="/images/kosa-logo.jpg"
          width={50}
          height={50}
          alt="Kosa logo"
        />
        <span className="ml-2 self-center whitespace-nowrap text-2xl font-Shilla dark:text-white">
          UMass KOSA
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Link
            className="bg-korean-blue text-white py-2 px-3 rounded-full"
            href="/profile"
          >
            Profile
          </Link>
        ) : (
          <Link
            className="bg-korean-blue text-white py-2 px-3 rounded-full"
            href="/auth"
          >
            Sign In
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" className="hover:!text-gray-400">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about" className="hover:!text-korean-red">
          About
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/event"
          className="hover:!text-korean-blue"
        >
          Event
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/post"
          className="hover:!text-korean-yellow"
        >
          Post
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/contact"
          className="hover:!text-korean-black"
        >
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
