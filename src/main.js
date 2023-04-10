import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.apiUrl = import.meta.env.VITE_API_URL;
app.config.globalProperties.apiKey = import.meta.env.VITE_MOVIE_DB_KEY;
app.config.globalProperties.imgUrl = import.meta.env.VITE_MOVIE_IMAGE_URL;
app.config.globalProperties.backdropUrl = import.meta.env.VITE_MOVIE_BACKDROP_URL;

app.use(createPinia())
app.use(router)

app.mount('#app')
