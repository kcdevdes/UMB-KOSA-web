import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import Button from '@/components/ui/Button';

export default async function WelcomePage() {
  const t = await getTranslations('home');

  return (
    <div>
      <SiteHeader />
      <section
        className="container mx-auto grid min-h-dvh items-center gap-10 px-4 sm:px-6 md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:px-8"
        style={{
          paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <div className="relative aspect-[16/9] w-28 overflow-hidden sm:w-40">
              <Image
                src="/images/umass-boston.png"
                alt="UMass Boston"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 160px, (min-width: 640px) 120px, 112px"
              />
            </div>
            <p className="text-2xl font-bold sm:text-3xl md:text-4xl">{t('hero.title')}</p>
            <p className="text-lg font-light sm:text-xl md:text-2xl lg:text-3xl">{t('hero.subtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button type="primary" text={t('hero.primaryCta')} href="/contact" />
            <Button type="default" text={t('hero.secondaryCta')} href="/about" />
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            className="w-full max-w-xl opacity-50"
            src="/images/main-taeguek.png"
            alt="Taeguek Image"
            width={720}
            height={720}
            priority
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, (min-width: 768px) 440px, 90vw"
          />
        </div>
      </section>
      <section
        className="flex flex-col items-center bg-gray-50 px-4 sm:px-6"
        style={{
          paddingTop: 'calc(5rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <p className="text-center text-3xl font-thin sm:text-4xl md:text-5xl md:text-end">
          {t('tagline')}
        </p>
      </section>
      <section
        className="container mx-auto grid min-h-dvh items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
        style={{
          paddingTop: 'calc(4rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="space-y-6 text-center md:text-left">
          <p className="text-4xl font-bold text-korean-blue">{t('connection.title')}</p>
          <p className="text-2xl whitespace-pre-line">{t('connection.mantra')}</p>
          <p className="text-gray-600">{t('connection.description')}</p>
        </div>
        <div className="flex justify-center">
          <Image
            className="h-72 w-full max-w-md rounded-3xl object-cover shadow-lg md:h-96"
            src="/images/1.jpg"
            alt="KOSA Connection"
            width={800}
            height={800}
            sizes="(min-width: 1280px) 420px, (min-width: 1024px) 360px, (min-width: 768px) 360px, 80vw"
          />
        </div>
      </section>
      <section
        className="container mx-auto grid min-h-dvh items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
        style={{
          paddingTop: 'calc(4rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="flex justify-center">
          <Image
            className="h-72 w-full max-w-md rounded-3xl object-cover shadow-lg md:h-96"
            src="/images/activity1.jpeg"
            alt="KOSA Community"
            width={800}
            height={800}
            sizes="(min-width: 1280px) 420px, (min-width: 1024px) 360px, (min-width: 768px) 360px, 80vw"
          />
        </div>
        <div className="space-y-6 text-center md:text-left">
          <p className="text-4xl font-bold text-korean-blue">{t('embrace.title')}</p>
          <p className="text-2xl whitespace-pre-line">{t('embrace.mantra')}</p>
          <p className="text-gray-600">{t('embrace.description')}</p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
