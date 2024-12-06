import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {VSnackbar} from 'vuetify/components'
import {} from 'vuetify/directives'
const vuetify = createVuetify({
    components:{VSnackbar},
    directives:{}
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
