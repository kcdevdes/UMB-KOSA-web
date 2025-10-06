import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
const traditionOrder = ['songpyeon', 'charye', 'folkGames'] as const;
const communityOrder = ['belonging', 'culture', 'support'] as const;

export default async function ChuseokPage() {
  const t = await getTranslations('chuseok');

  const overview = t.raw('overview') as {
    title: string;
    lede: string;
    paragraphs: string[];
  };

  const traditionEntries = t.raw('traditions.items') as Record<
    (typeof traditionOrder)[number],
    {title: string; description: string, image?: string}
  >;

  const communityEntries = t.raw('community.highlights') as Record<
    (typeof communityOrder)[number],
    {title: string; description: string}
  >;

  const tips = t.raw('tips.items') as string[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-orange-50">
      <SiteHeader />
      <main className="pt-28 pb-20">
        <section className="container mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-600">
            {t('hero.badge')}
          </span>
          <h1 className="mt-6 text-4xl font-semibold text-slate-900 sm:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            {t('hero.description')}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#overview"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700"
            >
              {t('hero.primaryCta')}
            </a>
            <a
              href="#enjoy"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>
        </section>

        <section id="overview" className="container mx-auto mt-16 max-w-5xl px-6">
          <div className="rounded-3xl border border-amber-100 bg-white/90 px-8 py-12 shadow-md">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold text-slate-900">
                    {overview.title}
                  </h2>
                  <p className="text-base text-slate-600 sm:text-lg">
                    {overview.lede}
                  </p>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {overview.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-amber-100 bg-amber-50">
                <Image
                  src="/images/chuseok/happy-chuseok.jpg"
                  alt="Family celebrating Chuseok together"
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="traditions" className="container mx-auto mt-20 max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              {t('traditions.title')}
            </h2>
            <p className="mt-4 text-base text-slate-600">
              {t('traditions.description')}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {traditionOrder.map((key) => {
              const {title, description} = traditionEntries[key];

              return (
                <div
                  key={key}
                  className="rounded-3xl border border-amber-100 bg-white/80 p-8 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-4 text-sm text-slate-600">{description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="celebrate"
          className="container mx-auto mt-20 max-w-5xl px-6"
        >
          <div className="rounded-3xl border border-amber-200 bg-amber-50/80 px-8 py-12 shadow-inner">
            <h2 className="text-2xl font-semibold text-slate-900">
              {t('community.title')}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {communityOrder.map((key) => {
                const {title, description} = communityEntries[key];

                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="enjoy" className="container mx-auto mt-20 max-w-5xl px-6">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-semibold">{t('tips.title')}</h2>
            <div className="relative mx-auto mt-6 max-w-3xl overflow-hidden rounded-3xl border border-amber-200">
              <Image
                src={"/images/chuseok/ways-to-enjoy-chuseok.jpg"}
                alt="Ways to enjoy Chuseok"
                width={960}
                height={540}
                className="h-auto w-full object-cover"
              />
            </div>
            <ul className="mt-8 space-y-3 text-left sm:text-center">
              {tips.map((tip, index) => (
                <li key={tip} className="text-sm text-slate-200 sm:text-base">
                  <span className="mr-2 font-semibold text-amber-200">{index + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
