const About=() => import('./../../views/About.vue');

const router = [
  {
    path: 'about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  }
]

export default [...router]
