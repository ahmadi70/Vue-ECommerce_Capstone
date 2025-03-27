import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { globalLoader } from 'vue-global-loader'
import { createNotivue } from 'notivue'
import 'notivue/notification.css'
import 'notivue/animations.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const notivue = createNotivue()

app.use(globalLoader)
app.use(notivue)
app.use(createPinia())
app.use(router)

app.mount('#app')
