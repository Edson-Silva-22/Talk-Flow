import { createRouter, createWebHistory, RouteLocationNormalizedLoaded } from 'vue-router'
import Default from '@/layouts/default.vue'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    //permissões para acessar
    // roles?: string[]

    //exige autenticação
    requiresAuth?: boolean
  }
}

const routes = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        meta: { requiresAuth: true },
        component: () => import('@/pages/home.vue')
      }
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

router.beforeEach(async (to: RouteLocationNormalizedLoaded) => {
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    //pegando o token no localStorage que foi definido no método de login
    const token = localStorage.getItem('token')

    if (token) {
      //usando o método verifyToken para verificar o token
      const isAuthenticated = await authStore.verifyToken(token)

      if (isAuthenticated) {
        return true
      }

      //se o token não for válido redireciona para a tela de login
      else {
        return { path: '/login' }
      }
    }

    //se o token não for existi redireciona para a tela de login
    else {
      return { path: '/login' }
    }
  }

  else {
    return true
  }
})

export default router
