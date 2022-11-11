import I18n from 'react-native-i18n';
import ar from './locales/ar.json';
import bu from './locales/bu.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import gu from './locales/gu.json';
import hi from './locales/hi.json';
import id from './locales/id.json';
import ig from './locales/ig.json';
import ka from './locales/ka.json';
import ml from './locales/ml.json';
import ms from './locales/ms.json';
import ru from './locales/ru.json';
import sp from './locales/sp.json';
import ta from './locales/ta.json';
import te from './locales/te.json';

I18n.fallbacks = true;
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'en';
I18n.locale = 'en';

I18n.translations = {
  ar,
  bu,
  en,
  fr,
  gu,
  hi,
  id,
  ig,
  ka,
  ml,
  ms,
  ru,
  sp,
  ta,
  te,
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};
export function Local(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
