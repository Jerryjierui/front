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
        {path: 'home',name: 'Home', meta:{name:'首页'},component: () => import('../views/manager/Home.vue')},
        {path: 'bookManager',name: 'BookManager',meta:{name:'教材信息'},component: () => import('../views/manager/BookManager.vue')},
        {path: 'student',name: 'Student',meta:{name:'学生信息'},component: () => import('../views/manager/Student.vue')},
        {path: 'teacher',name: 'Teacher',meta:{name:'教师信息'},component: () => import('../views/manager/Teacher.vue')},
        {path: 'person',name: 'Person',meta:{name:'个人信息'},component: () => import('../views/manager/Person.vue')},
        {path: 'password',name: 'password',meta:{name:'修改密码'},component: () => import('../views/manager/Password.vue')}
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
