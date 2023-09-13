import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Vuelidate from '@vuelidate/core';
import Vue3Lottie from 'vue3-lottie';

import App from '@/App.vue';
import i18n from '@/locales/i18n';
import router from '@/router/appRouter';
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import '@/sass/styles.sass';

const pinia = createPinia();
const app = createApp(App);

app.use(Vuelidate);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Vue3Lottie, { name: 'LottieAnimation' });
app.component('Datepicker-component', Datepicker);

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  },
});

app.mount('#app');
