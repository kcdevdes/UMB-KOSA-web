import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Alias() {
  const t = useTranslations('home.alias');

  return (
    <div className="bg-gray-100 py-24 sm:py-32 ">
      <div className="mx-auto flex flex-col justify-center items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
            Links
          </h2>
        </div>
        <Link
          href={'/about'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          {t('about')} {'≫'}
        </Link>
        <Link
          href={'/forum'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          {t('forum')} {'≫'}
        </Link>
        <Link
          href={'/event'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          {t('event')} {'≫'}
        </Link>

        <Link
          href={'/post'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          {t('post')} {'≫'}
        </Link>
        <Link
          href={'/contact'}
          className="text-korean-blue font-extrabold py-5 px-5 rounded-3xl text-2xl"
        >
          {t('contact')} {'≫'}
        </Link>
      </div>
    </div>
  );
}
