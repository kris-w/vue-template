<!-- /src/layouts/defaultLayout.vue -->

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>{{ siteName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isLoggedIn">
        <span ref="helloMessage" style="margin-right: 10px;">Hello, {{ username }}</span>
        <v-btn color="accent" @click="handleLogout">Logout</v-btn>
      </template>
      <template v-else>
        <router-link to="/login">
          <v-btn color="accent">Login</v-btn>
        </router-link>
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
  import { useTokens } from '@/composables/useTokens.js';
  import { useAccounts } from '@/composables/useAccounts.js';
  import { computed, onMounted } from 'vue'; 

  // Destructure the loggedIn state and username from useTokens
  const { tokenSet, tokenDecoded, recallTokens } = useTokens() || {};

  // Destructure the logout method from useAccounts
  const { logout } = useAccounts();

  onMounted(() => {
    // Call recallTokens when the component is mounted
    recallTokens();
  });

  // Computed property to check if the user is logged in
  const isLoggedIn = computed(() => tokenSet.value);
  
  // Computed property to get the username if the user is logged in
  const username = computed(() => tokenDecoded.value ? tokenDecoded.value.username : null);

  // Method to handle logout
  function handleLogout() {
    logout(); // Call the logout method
  }
</script>
