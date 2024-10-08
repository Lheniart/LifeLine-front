
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';



createApp(App)
    .use(router)
    .mount('#app')

