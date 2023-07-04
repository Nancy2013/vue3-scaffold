import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './../views/HomeView.vue'

const context:any = import.meta.glob('./routers/*.ts');
console.log('--context--',context);

let routes:any=[];
Object.keys(context).forEach(async (key:string)=>{
  // const fileName=key.replace(/(\.\/routers\/|\.ts)/g, '');  
  const file=await context[key]()
  const router=file.default;    
  routes=routes.concat(router);
},[]);

console.log('----routes--',routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:routes,
    },
  ]
})

export default router
