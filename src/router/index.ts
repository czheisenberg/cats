import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import CatDetailPage from '@/pages/CatDetailPage.vue'
import RegionPage from '@/pages/RegionPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/cat/:id',
    name: 'cat-detail',
    component: CatDetailPage,
  },
  {
    path: '/region/:id',
    name: 'region',
    component: RegionPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
