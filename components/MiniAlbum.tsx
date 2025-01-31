import Carousel from './ui/Carousel';

export default function MiniAlbum() {
  const images = [
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image3.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg',
    'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image3.jpg',
  ];

  return (
    <div className="bg-beacon-blue h-autoflex flex-col justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 items-center">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mb-2 pt-16 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            Our Memories
          </p>
        </div>
        <div className="mt-16 mb-16">
          <Carousel images={images} />
        </div>
      </div>
    </div>
  );
}
