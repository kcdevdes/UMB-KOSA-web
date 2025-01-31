export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
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
