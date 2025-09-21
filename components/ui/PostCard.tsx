import Link from 'next/link';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  instagramLink?: string;
}

const PostCard = ({
  imageSrc,
  title,
  description,
  instagramLink,
}: CardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link
        href={instagramLink || '#'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="w-full" src={imageSrc} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description} </p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
