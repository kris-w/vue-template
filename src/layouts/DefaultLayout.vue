<!-- /src/layouts/defaultLayout.vue -->

<template>
  <v-app>
    <v-app-bar app color="primary">
      <router-link :to="{ name: 'home' }" class="site-title">
        <v-toolbar-title>{{ siteName }}</v-toolbar-title>
      </router-link>  
      <v-spacer></v-spacer>
      <template v-if="account.isLoggedIn">
        <span ref="helloMessage" class="navbar-item">Hello, {{ account.username }}</span>
        <!-- Conditionally render the "admin" button if the user is an admin -->
          <v-btn class="navbar-item" v-if="account.isAdmin" @click="route('admin')"  append-icon="mdi-shield-crown" variant="tonal">Admin</v-btn>
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

  // Destructure the loggedIn state and username from useTokens
  const { tokenSet, tokenDecoded, recallTokens } = useTokens() || {};
  //check for admin user
  const account = useAccounts();
  const router = useRouter();

  onMounted(() => {
    // Call recallTokens when the component is mounted
    recallTokens();
    console.log(account.username);
  });

  // Method to handle logout
  function handleLogout() {
    account.logout(); // Call the logout method
  }

  // Nav aid
  function route(page) {
    router.push({ name: page });
  }  
</script>
