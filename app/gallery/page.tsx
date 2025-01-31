import { Navbar } from '@/components/ui/Navbar';

export default function Gallery() {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/images/sample-bg.jpg')] min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="text-9xl text-white font-extrabold">Gallery</h1>
      </div>
    </div>
  );
}
