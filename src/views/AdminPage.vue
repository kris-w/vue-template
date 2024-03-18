// /src/views/AdminPage.vue

<template>
  <div v-if="isLoggedIn && isAdmin">
    <h1>Welcome to the Admin Page</h1>
    <p>This is a placeholder component for the Admin page.</p>
  </div>
  <div v-else>
    <p>You do not have permission to access this page.</p>
  </div>
</template>

<script setup>
  import { useTokens } from '@/composables/useTokens.js';
  import { computed } from 'vue';

  const { tokenSet, tokenDecoded } = useTokens();

  const isLoggedIn = computed(() => tokenSet.value);
  const isAdmin = computed(() => {
    const userRoles = tokenDecoded.value?.roles || []; // Assuming roles are stored in the token's decoded payload
    return userRoles.includes('admin'); // Check if the user has the "admin" role
  });
</script>

<style scoped>
/* Add any scoped styles here */
</style>
