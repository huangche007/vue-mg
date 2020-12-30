import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const mRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/components/HelloWorld')
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: '/front-fund',
  scrollBehavior: () => ({ y: 0 }),
  routes: mRoutes
})

const router = createRouter()

export default router
