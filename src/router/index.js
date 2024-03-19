// /src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProtectedPage from '../views/ProtectedPage.vue';
import AdminPage from '../views/AdminPage.vue';
import AdminAllUsersPage from '../views/AdminAllUsersPage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';

// Import the useTokens composable to access the user's roles
import { useTokens } from '@/composables/useTokens.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  { 
    path: '/protected', 
    name: 'protected', 
    component: ProtectedPage,
    meta: { requiresAuth: true } // Add meta field to require authentication
  },  
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true } // Add meta fields for authentication and admin role
  },
  {
    path: '/admin/users',
    name: 'adminAllUsers',
    component: AdminAllUsersPage,
    meta: { requiresAuth: true, requiresAdmin: true } // Add meta fields for authentication and admin role
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationPage
  },  
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  // Define other routes here...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
  const { tokenDecoded } = useTokens(); // Destructure tokenDecoded from useTokens
  const userRoles = tokenDecoded.value?.roles || []; // Get the user's roles from the decoded token
  const isAdmin = userRoles.includes('admin'); // Check if the user has the admin role

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login page if authentication is required but user is not authenticated
  } else if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin)) {
    next('/'); // Redirect to home page if admin access is required but user is not authenticated or not an admin
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;
   