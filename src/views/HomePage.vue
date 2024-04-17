<template>
  <v-container fluid>

    <!-- Main Content -->
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 text-center my-5">Hello!</h1>
        <p class="text-center">This is a place to showcase some of the features and components available in the Vue starter app.</p>
      </v-col>
    </v-row>

    <!-- Feature Section -->
    <v-row>
      <v-col cols="12">
        <h2 class="display-3 text-center my-5">Features</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>User and token management</v-card-title>
          <v-card-text>
            <p>Out of the box you get account creation, secure login with JWT, and password reset functionality.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Administration panel</v-card-title>
          <v-card-text>
            <p>Role-based access control secures an admin panel for account management, extendable for custom features.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Helpers</v-card-title>
          <v-card-text>
            <p>Helper functions for implementing notifications, page metadata, and more make it easy to get started.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
