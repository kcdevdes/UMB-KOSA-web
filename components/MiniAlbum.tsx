'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import '@/app/embla-carousel.css';
import AutoScroll from 'embla-carousel-auto-scroll';

export default function MiniAlbum() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({ speed: 4 }),
  ]);
  const images = [
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image3.jpg',
  ];

  return (
    <div className="w-full h-screen flex justify-center items-center bg-beacon-blue py-10">
      <div className="flex justify-center items-center flex-col">
        <span className="text-white text-5xl mb-8 text-center">
          Look at our beautiful memories!
        </span>

        {/* Embla Slider Container */}
        <div className="embla w-full" ref={emblaRef}>
          <div className="embla__container">
            {images.map((url, index) => (
              <div key={index} className="embla__slide">
                <Image
                  src={url}
                  alt={`Slide ${index + 1}`}
                  width={400}
                  height={400}
                  className="rounded-3xl shadow-lg"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
