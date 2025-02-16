import Link from 'next/link';

export default function Alias() {
  return (
    <div className="bg-gray-100 py-24 sm:py-32 ">
      <div className="mx-auto flex flex-col justify-center items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
            Links
          </h2>
        </div>
        <Link
          href={'/about'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          Meet Our Members! {'≫'}
        </Link>
        <Link
          href={'/event'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          Find New Events! {'≫'}
        </Link>
        <Link
          href={'/post'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          Discover Our Past Activity! {'≫'}
        </Link>
        <Link
          href={'/contact'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          Need to Contact? {'≫'}
        </Link>
      </div>
    </div>
  );
}
