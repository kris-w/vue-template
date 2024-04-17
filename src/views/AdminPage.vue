<template>
  <v-container>
    <div v-if="account.isLoggedIn && account.isAdmin">
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-card-title>User accounts</v-card-title>
            <v-card-text>
              <v-btn color="primary" @click="route('adminAllUsers')">Manage Users</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <p>Your admin feature 2...</p>
        </v-col>
        <v-col cols="4">
          <p>Your admin feature 3...</p>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <p>You do not have permission to access this page.</p>
    </div>
  </v-container>
</template>

<script setup>
  import { useAccounts } from '@/composables/useAccounts.js';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMeta } from 'vue-meta';

  //check for admin user
  const account = useAccounts();
  const router = useRouter();

  useMeta({
    title: 'Administration > Main',
    htmlAttrs: { lang: 'en', amp: true }
  });

  // Nav aid
  function route(page) {
    router.push({ name: page });
  }  
</script>

<style scoped>
/* Add any scoped styles here */
</style>
