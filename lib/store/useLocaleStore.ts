import { create } from 'zustand';
import Cookies from 'js-cookie';

interface LocaleState {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: Cookies.get('locale') || 'en',
  setLocale: (locale) => {
    Cookies.set('locale', locale, { expires: 365 });
    set({ locale });
  },
}));
