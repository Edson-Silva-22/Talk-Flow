import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/default.vue'

const routes = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory("http://localhost:3000"),
  routes
})

export default router