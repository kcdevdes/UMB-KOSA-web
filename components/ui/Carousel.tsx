import React, { JSX } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps): JSX.Element {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({
      speed: 2,
      startDelay: 0,
      direction: 'forward',
      stopOnInteraction: false,
    }),
  ]);

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex mb-16">
        {images.map((url, index) => (
          <div key={index} className="flex-none max-w-full px-2 pl-3">
            <Image
              src={url}
              alt={`Slide ${index + 1}`}
              width={800}
              height={800}
              className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] object-cover rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
