'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const interviews = [
  {
    name: 'Jongsoo Ha',
    image: '/images/member-profile/jongsoo_ha.jpg',
    content:
      'As a president of this association, I am willing to provide more various KOSA events as often as possible.',
  },
  {
    name: 'Name 2',
    image: '/images/no-image.jpg',
    content: 'Member interviews Here',
  },
  {
    name: 'Gibeom Choi',
    image: '/images/member-profile/gibeom_choi.png',
    content: 'I am a coder of this website.',
  },
];

export default function MemberInterview() {
  return (
    <div className="p-20 h-auto bg-korean-blue space-y-10 flex flex-col justify-center items-center w-screen">
      {interviews.map((interview, index) => (
        <motion.div
          key={index}
          className="flex flex-col lg:flex-row items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
        >
          <Image
            src={interview.image}
            width={200}
            height={200}
            alt={interview.name}
            className="rounded-[50px] w-[200px] object-cover h-[200px]"
          />
          <div className="mt-10 lg:mt-5 ml-0 lg:ml-10 flex flex-col text-gray-100">
            <h1 className="w-[15vh] text-[2em]">{interview.name}</h1>
            <h1 className="font-thin text-gray-100 w-[25vh]">
              {interview.content}
            </h1>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
