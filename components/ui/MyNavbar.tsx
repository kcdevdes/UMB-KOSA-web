'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Image from 'next/image';

export default function MyNavbar() {
  const { user, userInfo } = useAuth();
  return (
    <Navbar fluid className="fixed z-10 overflow-hidden top-0 w-[100%]">
      <Navbar.Brand>
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
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Link
            className="bg-korean-red text-white p-3 rounded-full"
            href={'/profile'}
          >
            Hello, {userInfo?.username ?? 'User'}
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
        <Navbar.Link className="hover:!text-korean-red" href="/">
          Home
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-red" href="/about">
          About
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-red" href="#">
          Event
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-red" href="#">
          Post
        </Navbar.Link>
        <Navbar.Link className="hover:!text-korean-red" href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
