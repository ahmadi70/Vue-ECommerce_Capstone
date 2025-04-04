import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/auth/LoginView.vue'
import Register from '@/views/auth/RegisterView.vue'
import Category from '@/views/CategoryView.vue'
import SingleProduct from '@/views/products/[id].vue'
import { isUserLoggedIn } from '@/lib/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: '/products/:id',
      name: 'single-product',
      component: SingleProduct,
      meta: {
        auth: true
      }
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        auth: true
      }
    },
    {
      path: '/auth/login',
      name: 'auth-login',
      component: Login
    },
    {
      path: '/auth/register',
      name: 'auth-register',
      component: Register
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await isUserLoggedIn()

  if (to.name !== 'auth-login' && !isLoggedIn) {
    if (!to.meta.auth) {
      return next()
    }

    return next({ name: 'auth-login' })
  }
  else if (to.name === 'auth-login' && isLoggedIn) {
    return next({ name: 'home' })
  }
  else {
    next()
  }
})

export default router