import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetails from '../views/MovieDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movedetails/:id?',
      name: 'movieDetails',
      component: MovieDetails,
      props: route => ({ id: parseInt(route.params.id || 0) })
    }
  ]
})

export default router
