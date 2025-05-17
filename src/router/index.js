import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/api/supabase/index'

let localUser;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'authView',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { requiresAuth: true}
    },
     {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/AnauthorizedView.vue'),
    },
  ],
})

//getUser
async function getUser(next) {
	localUser = await supabase.auth.getSession();
	if (localUser.data.session == null) {
		next('/unauthorized')
	} else {
		next()
	}
}

//auth requirements
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next)
		// console.log('You must be logged it to access!')
	} 
	else {
		next()
	}
})

export default router