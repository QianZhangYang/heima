import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import(/* webpackChunkName:'base' */ '@/views/Home')
      },
      {
        path: '/profile',
        component: () => import(/* webpackChunkName:'base' */ '@/views/My')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:'search' */ '@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
