<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="doLogin">
              <v-text-field v-model="username" label="Username"></v-text-field>
              <v-text-field v-model="password" label="Password" type="password"></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
            <v-alert v-if="notification" :type="notification.type">{{ notification.message }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAccounts } from '@/composables/useAccounts.js';
import { useTokens } from '@/composables/useTokens.js';
import { useRouter } from 'vue-router';

const username = ref(null);
const password = ref(null);
const { login } = useAccounts();
const { setTokens } = useTokens();
const router = useRouter();
const notification = ref(null);

const doLogin = () => {
  login(username.value, password.value)
    .then(response => {
      console.log('Login response:', response); // Log the entire response object TAKE OUT
      if (response.success) {
        setTokens(response.payload.token, response.payload.tokenDecoded);
        router.push({ name: 'home' });
      } else {
        // Handle login failure
        notification.value = {
          type: 'error',
          message: 'Login unsuccessful. Please try again.'
        };
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      notification.value = {
        type: 'error',
        message: 'An error occurred during login. Please try again later.'
      };
    });
};
</script>
