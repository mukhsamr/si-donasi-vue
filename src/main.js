import App from './App.vue'
import router from "./router";
import axios from "axios";
import { createApp } from 'vue'
import { createPinia } from "pinia";


// Axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components: {
        ...components,
        ...labs
    },
    directives,
})

const pinia = createPinia()
const app = createApp(App)

// Storage URL
app.config.globalProperties.storage = import.meta.env.VITE_API_BASE_URL + '/storage'

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
