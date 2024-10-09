import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
          name: 'mapVue',
          component: () => import("@/views/MapView.vue")
        },
        {
          path: '/liste',
          name: 'listeDae',
          component: () => import("@/views/ListDaeView.vue")
        }
      ]
    },
    {
      path: '/details',
      name: 'detailsDae',
      component: () => import("@/views/DaeDetailsView.vue")
    },
  ]
})

export default router
