import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

const members = [
  {
    name: 'Jongsoo Ha',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
  {
    name: 'Jongsoo Ha2',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
  {
    name: 'Jongsoo Ha3',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
  {
    name: 'Jongsoo Ha4',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
  {
    name: 'Jongsoo Ha5',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
  {
    name: 'Jongsoo Ha6',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
  {
    name: 'Jongsoo Ha7',
    role: 'President',
    image: '/images/jongsoo_ha.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/429588136_1483830059148104_7832935325382085583_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2AF_PD7H7GfAT3q4PW0Oj38Ld7ZnUQ9Cv5liBaEEgfLaz_3U563c82PANyWClSpXA7qjU47UYhEyHqKNav7DhWkk&_nc_ohc=QE_KRcgg4GoQ7kNvgEPeZtj&_nc_gid=1454ecacc0c24172be1a1479b390d523&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCEKwu4svlnPom1jOjuBnZ_Rvcrwr7jJhM87NvP1a0xGw&oe=67AED756&_nc_sid=7a9f4b',
  },
];

export default function MemberProfile() {
  return (
    <div className="w-full px-4 py-10 text-center bg-korean-blue">
      <h1 className="ml-3 text-4xl font-bold mb-10 text-korean-white text-left">
        Meet Our KOSA Members
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {members.map((member) => (
          <Card key={member.name} className="w-80 p-4 text-center mx-auto">
            <Image
              src={member.link}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-500">{member.role}</p>
            <p className="text-gray-700 mt-2">{member.bio}</p>
            <Link href={member.link}>
              <span>Instagram</span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
