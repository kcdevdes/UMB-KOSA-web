'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Image from 'next/image';

export default function MyNavbar() {
  const { user } = useAuth();
  return (
    <Navbar
      fluid
      className="fixed z-10 overflow-hidden top-0 w-[100%] shadow-lg"
    >
      <Navbar.Brand>
        <Link href="/" className="flex">
          <Image
            className="rounded-full"
            src="/images/kosa-logo.jpg"
            width={50}
            height={50}
            alt={'Kosa logo'}
          ></Image>
          <span className="ml-2 self-center whitespace-nowrap text-1xl font-bold dark:text-white">
            UMass KOSA
          </span>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Link
            className="bg-korean-red text-white p-3 rounded-full"
            href={'/profile'}
          >
            Profile
          </Link>
        ) : (
          <Link
            className="bg-korean-red text-white p-3 rounded-full"
            href={'/auth'}
          >
            Sign In
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="hover:!text-gray-400" href="/">
          Home
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-red" href="/about">
          About
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-blue" href="/event">
          Event
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-yellow" href="/post">
          Post
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-black" href="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
