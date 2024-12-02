import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import LoginView from '../views/login/index.vue'
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
      name: 'loginView',
      component: LoginView
    }
  ],
})

export default router
