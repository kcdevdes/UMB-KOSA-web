import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaLinkedin } from 'react-icons/fa6';

interface CardProps {
  imageSrc: string;
  name: string;
  position: string;
  description: string;
  instagramLink?: string;
  linkedInLink?: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  name,
  position,
  description,
  instagramLink,
  linkedInLink,
}) => {
  return (
    <div className="m-6 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-stretch gap-6 bg-white rounded-xl drop-shadow-md px-6 py-8 md:px-10 md:py-10">
      <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 flex-shrink-0 overflow-hidden rounded-3xl border-4 border-white">
        <Image
          className="object-cover"
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 160px"
        />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
          <h3 className="font-bold text-2xl">{name}</h3>
          <p className="text-gray-600">{position}</p>
        </div>
        <p className="text-sm text-gray-700 leading-6">{description}</p>
        <div className="flex gap-4">
          {instagramLink && (
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={36} />
            </a>
          )}
          {linkedInLink && (
            <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={36} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
