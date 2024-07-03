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
        {path: 'password',name: 'password',meta:{name:'修改密码'},component: () => import('../views/manager/Password.vue')},
        {path: '403',name: 'Auth',component: () => import('../views/manager/Auth.vue')},
        {path: 'bookAdd',name: 'BookAdd',meta:{name:'教材添加'},component: () => import('../views/manager/BookAdd.vue')},
        {path: 'orderManager',name: 'OrderManager',meta:{name:'订单管理'},component: () => import('../views/manager/OrderManager.vue')},
        {path: 'personOrderManager',name: 'PersonOrderManager',meta:{name:'个人订单管理'},component: () => import('../views/manager/PersonOrderManager.vue')},
        {path: 'homr',name: 'Homr',meta:{name:'系统评价'}, component: () => import('../views/manager/homr.vue')},



      ]
    },
    {
      path: '/forgot-password', // 使用新的捕捉所有路由的语法
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/:pathMatch(.*)*', // 使用新的捕捉所有路由的语法
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to 是到达的路由信息
  // from 是开源的路由信息
  // next 是帮助我们跳转路由的函数
  let adminPaths = ['/manager/student', '/manager/teacher']
  let user = JSON.parse(localStorage.getItem('honey-user') || '{}')

  if (user.role !== 'admin' && adminPaths.includes(to.path)) {
    // 如果当前登录的用户不是管理员，然后当前的到达的路径是管理员才有权限访问的路径，那这个时候我就让用户去到一个没有权限的页面，不让他访问实际的页面
    next('/manager/403')
  } else {
    next()
  }
})

export default router
