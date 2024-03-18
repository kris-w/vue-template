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
              <v-alert v-if="notification" :type="notification.type">{{ notification.message }}</v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  //Plugins
  
  import { useRouter, useRoute } from 'vue-router'

  //Components

  //Composables
  import { useAccounts } from '@/composables/useAccounts.js'
  const { register, resetNewUser, newUser } = useAccounts()
  const router = useRouter()

  function createNewAccount() {
    register().then((response) => {
      resetNewUser();
      console.log('response', response)

      if (response.success) {
        router.push({ name: 'home' });
      }
      else{
        notification.value = {
            type: 'error',
            message: 'Registration unsuccessful. Please try again.'
          };
      }
    }).catch((error) => {
      console.log("Error identified", error);
      notification.value = {
          type: 'error',
          message: 'An error occurred during registration. Please try again later.'
        };
    });

  }
  
  </script>
  