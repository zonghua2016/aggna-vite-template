import { createApp, h } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import '@/assets/styles/main.less'
// import Meta from 'vue-meta'
// .use(Meta, {refreshOnceOnNavigation: true})
// import MetaInfo from "vue-meta-info";


createApp({
  setup() { },
  render: () => h(App)
}).use(router).use(store)
  .mount('#app');
