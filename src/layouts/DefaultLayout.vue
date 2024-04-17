<!-- /src/layouts/defaultLayout.vue -->

<template>
  <v-app>
  <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="route('home')"><v-list-item-title>Home</v-list-item-title></v-list-item>
        <v-list-item  v-if="account.isLoggedIn.value" @click="route('protected')"><v-list-item-title>Protected</v-list-item-title></v-list-item>        
        <v-list-item  v-if="account.isAdmin.value" @click="route('admin')"><v-list-item-title>Admin</v-list-item-title></v-list-item>
        <v-divider></v-divider>
        <v-list-item  v-if="account.isLoggedIn.value" @click="handleLogout()"><v-list-item-title>Logout</v-list-item-title></v-list-item>
        <v-list-item @click="route('PasswordResetRequest')"><v-list-item-title>Request Password Reset</v-list-item-title></v-list-item>
      </v-list>
    </v-navigation-drawer>    
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link :to="{ name: 'home' }" class="site-title">
        <v-toolbar-title>{{ siteName }}</v-toolbar-title>
      </router-link>  

      <v-spacer></v-spacer>
      <!-- Conditionally render the "admin" button if the user is an admin -->
      <v-btn icon class="navbar-item">
        <v-icon v-if="account.isAdmin.value" @click="route('admin')"  >mdi-shield-crown</v-icon>
      </v-btn>
     
      <template v-if="account.isLoggedIn.value">
        <span ref="helloMessage" class="navbar-item">Hello, {{ account.username.value }}</span>
        <v-btn class="navbar-item" @click="handleLogout" append-icon="mdi-logout" variant="tonal">Logout</v-btn>
        
      </template>
      <template v-else>
        <v-btn  @click="route('login')" append-icon="mdi-login">Login</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  // Import the environment variable
  const siteName = import.meta.env.VITE_APP_SITE_NAME;

  // Import useTokens and useAccounts composables
  import { useRouter } from 'vue-router';
  import { useTokens } from '@/composables/useTokens.js';
  import { useAccounts } from '@/composables/useAccounts.js';
  import { onMounted } from 'vue'; 
  import { ref } from 'vue';

  const drawer = ref(false);

  // Destructure the loggedIn state and username from useTokens
  const { tokenSet, tokenDecoded, recallTokens } = useTokens() || {};
  //check for admin user
  const account = useAccounts();
  const router = useRouter();

  onMounted(() => {
    // Call recallTokens when the component is mounted
    recallTokens();
  });

  // Method to handle logout
  function handleLogout() {
    account.logout(); // Call the logout method
    route('login');
  }

  // Nav aid
  function route(page) {
    router.push({ name: page });
  }  
</script>
