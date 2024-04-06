<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is a placeholder component for the Home page.</p>
  </div>
</template>

<script setup>
  import { useMeta } from 'vue-meta';

  useMeta({
      title: 'Home',
      htmlAttrs: { lang: 'en', amp: true }
    });

</script>


<style scoped>
/* Add any scoped styles here */
</style>
