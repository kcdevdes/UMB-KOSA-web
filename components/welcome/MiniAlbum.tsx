/**
 * I love this component because I coded the caurosel very well.
 */

import Carousel from '../ui/Carousel';
import { useTranslations } from 'next-intl';

export default function MiniAlbum() {
  const images = [
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image3.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image3.jpg',
  ];

  const t = useTranslations('home.miniAlbum');

  return (
    <div className="bg-korean-white h-[80vh] flex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mb-2 pt-16 text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl lg:text-balance">
            {t('ourMemory')}
          </p>
        </div>
        <div className="mt-16">
          <Carousel images={images} />
        </div>
      </div>
    </div>
  );
}
