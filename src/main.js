import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import axios from 'axios'

const app = createApp(App)

// app.provide('$axios',axios)
app.use(ElementPlus)
app.use(router)

app.mount('#app')