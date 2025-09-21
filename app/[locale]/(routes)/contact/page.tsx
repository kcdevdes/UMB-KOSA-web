"use client";

import {FormEvent, useState} from 'react';
import {useTranslations} from 'next-intl';
import {FiInstagram} from 'react-icons/fi';

import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const CONTACT_TOPIC_VALUES = [
  'events',
  'collaboration',
  'sponsorship',
  'membership',
  'other',
] as const;

type ContactTopic = (typeof CONTACT_TOPIC_VALUES)[number];

type TopicOption = {
  value: ContactTopic;
  label: string;
};

const ContactPage = () => {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const topicOptions: TopicOption[] = CONTACT_TOPIC_VALUES.map((value) => ({
    value,
    label: t(`form.topics.${value}`),
  }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage(t('form.validationError'));
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const topicLabel = topic;
      const topicPrefix = topicLabel ? t('form.topicPrefix', { topic: topicLabel }) : '';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: `${topicPrefix}${message}`,
        }),
      });

      if (!response.ok) {
        throw new Error('FAILED_REQUEST');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setTopic('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
      setErrorMessage(t('form.error'));
    }
  };

  const buttonLabel = status === 'submitting' ? t('form.submitting') : t('form.submit');

  return (
    <>
      <SiteHeader />
      <main className="relative isolate min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-sky-50 to-sky-200">
        <div className="container relative mx-auto flex min-h-[70vh] flex-col items-center px-6 pb-32 pt-32">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              {t('hero.description')}
            </p>
          </div>
          <div className="mt-16 grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <form
              className="relative isolate rounded-3xl bg-white/85 p-10 shadow-xl ring-1 ring-sky-100 backdrop-blur"
              onSubmit={handleSubmit}
            >
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl" />
              <div className="absolute -right-6 bottom-8 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />
              <div className="relative grid gap-6">
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="name"
                  >
                    {t('form.name')}
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('form.namePlaceholder')}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="email"
                  >
                    {t('form.email')}
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="topic"
                  >
                    {t('form.topic')}
                  </label>
                  <select
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="topic"
                    name="topic"
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                  >
                    <option value="" disabled>
                      {t('form.topicPlaceholder')}
                    </option>
                    {topicOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="message"
                  >
                    {t('form.message')}
                  </label>
                  <textarea
                    className="mt-2 min-h-[200px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="message"
                    name="message"
                    placeholder={t('form.messagePlaceholder')}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">{t('form.disclaimer')}</p>
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                    type="submit"
                    disabled={status === 'submitting'}
                  >
                    {buttonLabel}
                  </button>
                </div>
                {status === 'success' && (
                  <p className="text-sm font-medium text-green-600">
                    {t('form.success')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-medium text-red-600">
                    {errorMessage || t('form.error')}
                  </p>
                )}
              </div>
            </form>
            <aside className="rounded-3xl border border-white/50 bg-white/60 p-8 shadow-lg backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-900">
                {t('direct.title')}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                {t('direct.description')}
              </p>
              <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                  {t('direct.ctaLabel')}
                </p>
                <p className="mt-3 text-base font-semibold">
                  {t('direct.ctaDescription')}
                </p>
                <a
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white"
                  href="https://www.instagram.com/umb_kosa"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiInstagram />
                  {t('direct.instagram')}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default ContactPage;
