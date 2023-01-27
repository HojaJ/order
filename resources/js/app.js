import './bootstrap';
import store from "./store";
import { createApp } from 'vue';
import App from "./App.vue";
import './main.css';

const app = createApp(App);


app.use(store).mount('#app');
