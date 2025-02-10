/**
 * Reference Component
 */

import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/Button';

export default function Reference() {
  const links = [
    {
      name: 'KOSA',
      role: 'Instagram',
      link: 'https://www.instagram.com/umb_kosa/',
      imageUrl:
        'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/308643062_1076838373204387_5369014883573964519_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2AHTgHhPelmZHblAd3voMq6RLtPwP2pXWH9TjIdQA_DDliE14JwUj_iSIzVCsdt8UsLjz0BrDlecS0GHNcsyvPDP&_nc_ohc=9g5wCJ1Xmt8Q7kNvgHIhM0U&_nc_gid=28b7661c708b4a1cae05167e0104f25b&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYAXQx3Ce67wze8BfIjWmIKOiuEAhUbqPPPDPLFx6dKymQ&oe=67AECE75&_nc_sid=7a9f4b',
    },
    {
      name: 'KOSA',
      role: 'LinkedIn',
      link: '',
      imageUrl:
        'https://scontent-bos5-1.cdninstagram.com/v/t51.2885-19/308643062_1076838373204387_5369014883573964519_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2AHTgHhPelmZHblAd3voMq6RLtPwP2pXWH9TjIdQA_DDliE14JwUj_iSIzVCsdt8UsLjz0BrDlecS0GHNcsyvPDP&_nc_ohc=9g5wCJ1Xmt8Q7kNvgHIhM0U&_nc_gid=28b7661c708b4a1cae05167e0104f25b&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYAXQx3Ce67wze8BfIjWmIKOiuEAhUbqPPPDPLFx6dKymQ&oe=67AECE75&_nc_sid=7a9f4b',
    },
  ];

  return (
    <div className="bg-gray-100 py-24 sm:py-32 ">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
            Meet Our Social Media
          </h2>
          <p className="mt-6 text-lg/8 text-black">
            We love connecting with diverse people and will keep you updated
            with events and news through social media! Stay tuned! ➜
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {links.map((link, index) => (
            <li key={index}>
              <div className="flex items-center gap-x-6">
                <Image
                  alt=""
                  src={link.imageUrl}
                  width={60}
                  height={60}
                  className="size-24 rounded-full shadow-lg"
                />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight ">
                    {link.name}
                    <span className="font-thin mx-2">{link.role}</span>
                  </h3>
                  <p className="text-sm/6 font-semibold">
                    {link.role === 'Instagram' ? (
                      <Link href={link.link}>
                        <Button>
                          <span className="[&>svg]:h-6 [&>svg]:w-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 448 512"
                            >
                              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                          </span>
                        </Button>
                      </Link>
                    ) : (
                      <Link href={link.link}>
                        <Button>
                          <span className="[&>svg]:h-6 [&>svg]:w-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="text-korean-blue"
                            >
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                            </svg>
                          </span>
                        </Button>
                      </Link>
                    )}
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
