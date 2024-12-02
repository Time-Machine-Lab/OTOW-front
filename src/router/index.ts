import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import LoginView from '../views/login/index.vue'
import MarketView from '../views/market/index.vue'
import PersonalView from '../views/personal/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/market',
      name: 'market',
      component: MarketView,
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalView,
    },
  ],
})

export default router
