import { Navbar } from '@/components/Navbar';

export default function CalendarPage() {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/images/sample-bg.jpg')] min-h-screen w-full">
      <Navbar />
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="text-9xl text-white font-extrabold">Calendar</h1>
      </div>
    </div>
  );
}
