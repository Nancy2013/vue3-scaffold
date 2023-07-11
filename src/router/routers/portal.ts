const portal=() => import('viewsPath/Portal.vue');

const router = [
  {
    path: 'portal',
    name: 'portal',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: portal,
  }
]

export default [...router]
