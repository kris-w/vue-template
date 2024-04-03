import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProtectedPage from '../views/ProtectedPage.vue';
import AdminPage from '../views/AdminPage.vue';
import AdminAllUsersPage from '../views/AdminAllUsersPage.vue';
import AdminEditUserPage from '../views/AdminEditUserPage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import PasswordResetRequestPage from '../views/PasswordResetRequestPage.vue';
import PasswordResetPage from '../views/PasswordResetPage.vue';

// Import the useAccounts composable to handle user authentication and authorization
import { useAccounts } from '@/composables/useAccounts.js';

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
    path: '/admin/users/:userId',
    name: 'UserProfile',
    component: AdminEditUserPage,
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
  {
    path: '/password/reset/request',
    name: 'PasswordResetRequest',
    component: PasswordResetRequestPage
  },
  {
    path: '/password/reset',
    name: 'PasswordReset',
    component: PasswordResetPage
  },
  
  // Define other routes here...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn, isAdmin } = useAccounts(); // Destructure isLoggedIn and isAdmin from useAccounts
  const isAuthenticated = isLoggedIn.value;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login page if authentication is required but user is not authenticated
  } else if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin.value)) {
    next('/'); // Redirect to home page if admin access is required but user is not authenticated or not an admin
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;
