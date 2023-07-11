import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const context:any = import.meta.glob("./routers/*.ts",{ eager: true });
const childrenRoutes = Object.keys(context).reduce((rs, key) => {
  const router:Array<any>=context[key].default;
  rs.push(...router);
  return rs;
}, []);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:childrenRoutes,
    },
  ]
})

export default router
