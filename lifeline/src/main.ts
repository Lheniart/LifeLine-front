import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';



createApp(App)
    .use(router)
    .use(store)
    .mount('#app')

