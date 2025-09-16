import SiteHeader from '@/components/layout/SiteHeader';
import {
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

const ContactPage = () => {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-sky-50 to-sky-200">
        <div className="container relative mx-auto flex min-h-[70vh] flex-col items-center px-6 pb-32 pt-32">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              Contact the KOSA Team
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              We’re here for collaborations, cultural events, sponsorships, and
              everything in between. Share a little about what you’re looking
              for, and we’ll reach back out shortly.
            </p>
          </div>
          <div className="mt-16 grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <form className="relative isolate rounded-3xl bg-white/85 p-10 shadow-xl ring-1 ring-sky-100 backdrop-blur">
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl" />
              <div className="absolute -right-6 bottom-8 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />
              <div className="relative grid gap-6">
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="topic"
                  >
                    I’m reaching out about
                  </label>
                  <select
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="topic"
                    name="topic"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="events">Hosting an event</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="membership">Membership</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="message"
                  >
                    How can we help?
                  </label>
                  <textarea
                    className="mt-2 min-h-[200px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    id="message"
                    name="message"
                    placeholder="Share a few details so we can prepare the best response."
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">
                    We respect your inbox. Expect a response within two business
                    days.
                  </p>
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                    type="submit"
                  >
                    Send message
                  </button>
                </div>
              </div>
            </form>
            <aside className="rounded-3xl border border-white/50 bg-white/60 p-8 shadow-lg backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-900">
                Prefer to reach out directly?
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Our team is always happy to chat about ideas and opportunities to
                celebrate Korean culture on campus and beyond.
              </p>
              <ul className="mt-8 space-y-5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <FiMail className="text-lg" />
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <a
                      className="transition hover:text-sky-600"
                      href="mailto:info@example.com"
                    >
                      info@example.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <FiPhone className="text-lg" />
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Phone</p>
                    <a
                      className="transition hover:text-sky-600"
                      href="tel:+18571234567"
                    >
                      +1 (857) 123-4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <FiMapPin className="text-lg" />
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Visit us</p>
                    <p>100 Morrissey Blvd<br />Boston, MA 02125</p>
                  </div>
                </li>
              </ul>
              <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                  Follow our journey
                </p>
                <p className="mt-3 text-base font-semibold">
                  Get the latest event drops and highlights on Instagram.
                </p>
                <a
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white"
                  href="https://www.instagram.com/umb_kosa"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiInstagram />
                  @umb_kosa
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
