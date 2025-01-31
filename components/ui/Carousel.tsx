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
      direction: 'backward',
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
              className="w-[200] h-[200] md:w-[300] md:h-[300] lg:w-[400] lg:h-[400] object-cover rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
