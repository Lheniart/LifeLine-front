import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import piniaPersistedState from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPersistedState);

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

