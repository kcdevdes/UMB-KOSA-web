import {getTranslations} from 'next-intl/server';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import Card from '@/components/ui/ProfileCard';

export default async function AboutPage() {
  const t = await getTranslations('about');

  const members = [
    {
      imageSrc: '/images/profiles/wonjung_jin.jpg',
      name: t('members.wonjungJin.name'),
      position: t('members.wonjungJin.position'),
      description: t('members.wonjungJin.description'),
      instagramLink: 'https://www.instagram.com/w0njungj1n',
      linkedInLink: 'https://www.linkedin.com/in/wonjung-jin-6653b2282/',
    },
    {
      imageSrc: '/images/profiles/gibeom_choi.png',
      name: t('members.gibeomChoi.name'),
      position: t('members.gibeomChoi.position'),
      description: t('members.gibeomChoi.description'),
      instagramLink: 'https://www.instagram.com/g_choi001',
      linkedInLink: 'https://www.linkedin.com/in/g-choi001/',
    },
    {
      imageSrc: '/images/profiles/jiyun.jpg',
      name: t('members.jiyunLee.name'),
      position: t('members.jiyunLee.position'),
      description: t('members.jiyunLee.description'),
      instagramLink: 'https://www.instagram.com/ji_y99n_/',
      linkedInLink: 'https://www.linkedin.com/in/jiyun-lee-263bb0349/',
    },
    {
      imageSrc: '/images/profiles/evelyn_gu.jpg',
      name: t('members.evelynGu.name'),
      position: t('members.evelynGu.position'),
      description: t('members.evelynGu.description'),
      instagramLink: 'https://www.instagram.com/mehturtle?igsh=NTgwdGI1NHo0MWwx&utm_source=qr',
      linkedInLink:
        'https://www.linkedin.com/in/evelyn-gu-9569602a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
    {
      imageSrc: '/images/profiles/cindy_lim.jpg',
      name: t('members.dahyeLim.name'),
      position: t('members.dahyeLim.position'),
      description: t('members.dahyeLim.description'),
    },
    {
      imageSrc: '/images/profiles/jonathan.jpg',
      name: t('members.jonathanChow.name'),
      position: t('members.jonathanChow.position'),
      description: t('members.jonathanChow.description'),
    },
    {
      imageSrc: '/images/profiles/stevens.jpg',
      name: t('members.stevensCharles.name'),
      position: t('members.stevensCharles.position'),
      description: t('members.stevensCharles.description'),
    },
  ];

  return (
    <div className="pt-[20vmin] bg-gradient-to-b from-white to-blue-300 min-h-screen">
      <SiteHeader />
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center gap-12 pb-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-3xl sm:text-4xl font-semibold">{t('hero.title')}</p>
          <p className="text-gray-500">{t('hero.description')}</p>
        </div>
        {members.map((member) => (
          <Card key={member.name} {...member} />
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}
