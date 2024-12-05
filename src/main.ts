import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import {} from 'vuetify/components'
// import {} from 'vuetify/directives'
// import { aliases, md } from 'vuetify/iconsets/md'


// const vuetify = createVuetify({
//    icons: {
//         defaultSet: 'md',
//         aliases,
//         sets: {
//                 md,
//         },
//    },
// })
import vuetify from "@/plugins/vuetify.ts";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
