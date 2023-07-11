import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from 'routerPath'
import libs from '@/libs'

import 'stylesPath/main.css'

const app = createApp(App)

libs(app);
app.use(createPinia())
app.use(router)

app.mount('#app')
