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
    <div className="m-12 h-[300px] flex items-center bg-white rounded-xl drop-shadow-md relative overflow-hidden">
      <Image
        className="ml-4"
        src={imageSrc}
        alt={name}
        width={300}
        height={300}
      />
      <div className="flex flex-col px-8 space-y-8">
        <div className="flex items-center gap-16">
          <h3 className="font-bold text-2xl">{name}</h3>
          <p className="text-gray-600">{position}</p>
        </div>
        <p className="text-sm">{description}</p>
        <div className="flex *:justify-center *items-center gap-4">
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
