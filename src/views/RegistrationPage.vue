<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>Registration</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="createNewAccount">
                <v-text-field v-model="newUser.username" label="Username"></v-text-field>
                <v-text-field v-model="newUser.email" label="Email"></v-text-field> <!-- Add email field -->
                <v-text-field v-model="newUser.password" label="Password" type="password"></v-text-field>
                <v-text-field v-model="newUser.password2" label="Confirm Password" type="password"></v-text-field>
                <v-btn type="submit" color="primary">Register</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
      v-model="notification.show"
      :timeout="5000"
      :color="notification.type === 'success' ? 'success' : 'error'"
    >
      {{ notification.message }}
    </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  //Plugins
  import { useRouter, useRoute } from 'vue-router'
  import { useMeta } from 'vue-meta';
  import { useNotification } from '@/composables/useNotifications.js';

  //Components

  //Composables
  import { useAccounts } from '@/composables/useAccounts.js'
  const { register, resetNewUser, newUser } = useAccounts()
  const router = useRouter()
  const { notification, showNotification } = useNotification();

  useMeta({
    title: 'Register',
    htmlAttrs: { lang: 'en', amp: true }
  });

  function createNewAccount() {
    register().then((response) => {
      resetNewUser();
      if (response.success) {
        router.push({ name: 'home' });
      }
      else{
        showNotification('error',response.message);
      }
    }).catch((error) => {
      console.log("Error identified", error);
      showNotification('error','An error occurred during registration. Please try again later.');
    });

  }
  
  </script>
  