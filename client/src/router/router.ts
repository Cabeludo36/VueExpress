import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
  },
  {
    path: '/users/:id',
    name: 'User',
    component: () => import('../views/User/UserView.vue'),
    children: [
      {
        path: '/users/:id/userHome',
        name: 'User Home',
        component: () => import('../views/User/UserHome.vue'),
      },
      {
        path: '/users/:id/userFriends',
        name: 'User Friends',
        component: () => import('../views/User/UserFriends.vue'),
      },
      {
        path: '/users/:id/userFamily',
        name: 'User Family',
        component: () => import('../views/User/UserFamily.vue'),
      },
      {
        path: '/users/:id/userPhotos',
        name: 'User Photos',
        component: () => import('../views/User/UserPhotos.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = process.env.VUE_APP_TITLE +' - '+ String(to.name);
  next()
});

export default router;
