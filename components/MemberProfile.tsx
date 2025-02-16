/**
 * MemberProfile
 */

import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

const members = [
  {
    name: 'Jongsoo Ha',
    role: 'President',
    image: '/images/member-profile/jongsoo_ha.jpg', // Static Image Input
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://www.instagram.com/jongsoo1203/',
  },
  {
    name: 'Wonjung Jin',
    role: 'Vice President',
    image: '/images/member-profile/wonjung_jin.jpg',
    bio: 'Wonjung is leading and supporting every individual belonging to KOSA.',
    link: 'https://www.instagram.com/w0njungj1n/',
  },
  {
    name: 'Wonyong Chung',
    role: 'Event Planner',
    image: '/images/member-profile/wonyong_chung.jpg',
    bio: 'Jongsoo is leading UMass KOSA with a passion for community building and student engagement.',
    link: 'https://www.instagram.com/w.y_colin_chung/',
  },
];

export default function MemberProfile() {
  return (
    <div className="bg-korean-blue py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl font-Shilla">
            Meet Our{' '}
            <span className="bg-white rounded-full px-3">
              <span className="text-korean-blue">KO</span>
              <span className="text-korean-red">SA</span>
            </span>{' '}
            Members
          </h2>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {members.map((member, index) => (
            <li key={index}>
              <div className="flex items-center gap-x-6">
                <Image
                  alt={member.name}
                  src={member.image}
                  width={60}
                  height={60}
                  className="size-24 rounded-full shadow-lg object-cover"
                />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-korean-yellow">
                    {member.name}
                    <span className="font-thin mx-2 text-white">
                      {member.role}
                    </span>
                  </h3>
                  <p className="text-sm/6 text-white">{member.bio}</p>
                  <p className="mt-2">
                    <Link href={member.link}>
                      <Button className="w-10 h-10 aspect-square rounded-full bg-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 448 512"
                          className="h-6 w-6 text-korean-blue"
                        >
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </Button>
                    </Link>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
