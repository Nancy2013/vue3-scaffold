import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from 'routerPath'
import libs from '@/libs'
import 'stylesPath/index';
const app = createApp(App)
// 注入config-icon组件
libs(app);
app.use(createPinia())
app.use(router)

app.mount('#app')
