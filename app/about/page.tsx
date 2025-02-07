import MyNavbar from '@/components/ui/MyNavbar';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

const members = [
  {
    name: 'Jongsoo Ha',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://instagram.com/',
  },
  {
    name: 'Jongsoo Ha2',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://instagram.com/',
  },
  {
    name: 'Jongsoo Ha3',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://instagram.com/',
  },
];

export default function AboutPage() {
  return (
    <div>
      <MyNavbar />
      <div className="mt-20 container mx-auto px-4 py-10 text-center">
        <h1 className="text-4xl font-bold mb-10">Meet Our Association</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {members.map((member) => (
            <Card key={member.name} className="w-80 p-4 text-center mx-auto">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-500">{member.role}</p>
              <p className="text-gray-700 mt-2">{member.bio}</p>
              <Link href={member.link}>Instagram</Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
