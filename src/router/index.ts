import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import LoginView from '../views/login/index.vue'
import MarketView from '../views/market/index.vue'
import PersonalView from '../views/personal/index.vue'
import WorkbenchView from '../views/workbench/workbench.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'market',
          component: MarketView,
        },
        {
          path: 'personal',
          name: 'personal',
          component: PersonalView,
        },
        {
          path: 'workbench',
          name: 'workbench',
          component: WorkbenchView,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})

export default router
