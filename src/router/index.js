import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import NewCafePage from '@/views/NewCafePage.vue'
import EditCafePage from '@/views/editCafePage.vue'
import SignInPage from '@/views/SignInPage.vue'
import LogInPage from '@/views/LogInPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/new',
      name: 'new-cafe',
      component: NewCafePage,
    },
    {
      path: '/cafe/:id',
      name: 'edit-cafe',
      component: EditCafePage,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInPage,
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: LogInPage,
    },
  ],
})

export default router
