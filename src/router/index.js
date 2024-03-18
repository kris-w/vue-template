import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Update import statement
import RegistrationPage from '@/views/RegistrationPage.vue'; // Make sure this import is correct
import LoginPage from '../views/LoginPage.vue';
import TestPage from '@/views/TestPage.vue'; // Import the TestPage component
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage // Use the updated variable name
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
    path: '/test', // Define a new test route
    name: 'test',
    component: TestPage
  }
  // Define other routes here...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

console.log("Router configuration:", routes); // Log the route configuration

export default router;
