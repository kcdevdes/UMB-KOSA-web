'use client';

export default function Hero() {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/images/sample-bg.jpg')] h-screen w-full">
      <div className="flex justify-center items-center h-screen flex-col">
        <h1
          className="text-9xl text-white font-extrabold"
          style={{ textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)' }}
        >
          KOSA
        </h1>
        <h1
          className="text-2xl text-white font-extrabold"
          style={{ textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)' }}
        >
          Korean Student Association at UMass Boston
        </h1>
      </div>
    </div>
  );
}
