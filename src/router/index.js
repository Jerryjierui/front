import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/page',
      name: 'Page',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Page.vue')
    },
    {
      path: '/manager',
      name: 'Manager',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Manager.vue'),
      redirect: '/manager/home',  //重定向
      children: [
        {path: 'home',name: 'Home',component: () => import('../views/manager/Home.vue')},
        {path: 'book',name: 'Book',component: () => import('../views/manager/Book.vue')},
      ]
    },
    {
      path: '/tian',
      name: 'Tian',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/tianmou.vue')
    }
  ]
})

export default router
