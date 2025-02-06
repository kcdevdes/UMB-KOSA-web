export default function Footer() {
  return (
    <footer className="bg-white ">
      <div className="w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-600">
          © 2025{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            KOSA
          </a>{' '}
          - UMass Boston Korean Student Association. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
