import { createI18n } from 'vue-i18n';
import en from './en.json';
import es from './es.json';

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'es',
  globalInjection: true,
  legacy: false,
  allowComposition: true,
  messages: {
    en: en,
    es: es,
  },
});

export default i18n;
