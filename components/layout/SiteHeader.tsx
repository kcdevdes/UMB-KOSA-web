import Image from 'next/image';
import Link from 'next/link';

const SiteHeader = () => {
  return (
    <header>
      <div className="container mx-auto px-4 py-2 flex justify-evenly backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <Image
              src="/images/kosa-logo-transparent.png"
              width={100}
              height={100}
              alt={'/images/no-image.jpg'}
              className="rounded-full w-12"
            />
            <p>KOSA</p>
          </div>
        </Link>
        <div className="my-auto flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/story">Story</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="my-auto flex space-x-4">
          <p>Language</p>
          <p>Sign In</p>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
