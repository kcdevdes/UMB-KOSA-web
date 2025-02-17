'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { useAuth } from '@/lib/hook/useAuth';
import Image from 'next/image';
import { useLocaleStore } from '@/lib/store/useLocaleStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function MyNavbar() {
  const { user } = useAuth();
  const { locale, setLocale } = useLocaleStore();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ko' : 'en';
    setLocale(newLocale);
    Cookies.set('locale', newLocale, { expires: 365 });

    router.refresh();
  };

  return (
    <Navbar
      fluid
      className="fixed z-40 *:overflow-hidden top-0 w-full shadow-lg bg-[#FAF6F5]"
    >
      <Navbar.Brand as={Link} href="/" className="flex items-center">
        <Image
          className="rounded-full"
          src="/images/kosa-logo.jpg"
          width={50}
          height={50}
          alt="Kosa logo"
        />
        <span className="ml-1 self-center whitespace-nowrap text-xl dark:text-white">
          UMB KOSA
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2 items-center gap-3">
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm"
          >
            {locale === 'en' ? '🇰🇷 한국어' : '🇺🇸 English'}
          </button>
        </div>

        {user ? (
          <Link
            className="bg-korean-red hover:bg-red-900 text-white py-2 px-3 rounded-full"
            href="/profile"
          >
            Profile
          </Link>
        ) : (
          <Link
            className="bg-korean-red hover:bg-red-900 text-white py-2 px-3 rounded-full"
            href="/auth"
          >
            Sign In
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" className="hover:!text-korean-red">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about" className="hover:!text-korean-red">
          About
        </Navbar.Link>
        <Navbar.Link as={Link} href="/forum" className="hover:!text-korean-red">
          Forum
        </Navbar.Link>
        <Navbar.Link as={Link} href="/event" className="hover:!text-korean-red">
          Event
        </Navbar.Link>
        <Navbar.Link as={Link} href="/post" className="hover:!text-korean-red">
          Post
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/contact"
          className="hover:!text-korean-red"
        >
          Contact
        </Navbar.Link>

        <div className="md:hidden flex flex-col mt-4">
          <button
            onClick={toggleLanguage}
            className="w-full px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm"
          >
            {locale === 'en' ? '🇰🇷 한국어' : '🇺🇸 English'}
          </button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
