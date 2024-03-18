<!-- /src/views/ProtectedPage.vue -->

<template>
    <div v-if="isLoggedIn">
      <h1>Welcome to the Protected Page</h1>
      <p>This is a placeholder component for the Protected page.</p>
    </div>
    <div v-else>
      <p>You need to log in to access this page.</p>
    </div>
  </template>
  
  <script setup>
    import { useTokens } from '@/composables/useTokens.js';
    import { computed } from 'vue';
  
    const { tokenSet } = useTokens();
  
    const isLoggedIn = computed(() => tokenSet.value);
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  