import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import router from './router';

import gAuthPlugin from "vue3-google-oauth2";
import { VueReCaptcha } from 'vue-recaptcha-v3';
const gauthOption = {
  clientId:
    "768834812579-ivi0oopbkqe05cg6t41p83t7gteekut6.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: false
};
createApp(App)
  .use(router)
  .use(gAuthPlugin, gauthOption)
  // .use(VueReCaptcha, {
  //   siteKey: '6LftB6omAAAAAMOxcQ8mITZUGPJfJjGw8hc8cOvN',
  // })
  .mount('#app');