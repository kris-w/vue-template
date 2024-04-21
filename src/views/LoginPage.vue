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
            <v-divider class="mt-4"></v-divider>
            <p class="mt-4">Don't have an account yet? <router-link :to="{ name: 'register' }">Register here</router-link>.</p>
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
import { ref } from 'vue';
import { useAccounts } from '@/composables/useAccounts.js';
import { useTokens } from '@/composables/useTokens.js';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { useNotification } from '@/composables/useNotifications.js';

const username = ref(null);
const password = ref(null);
const { login } = useAccounts();
const { setTokens } = useTokens();
const router = useRouter();
const { notification, showNotification } = useNotification();

useMeta({
    title: 'Login',
    htmlAttrs: { lang: 'en', amp: true }
  });

const doLogin = () => {
  login(username.value, password.value)
    .then(response => {
      console.log('Login response:', response); // Log the entire response object TAKE OUT
      if (response.success) {
        setTokens(response.payload.token, response.payload.tokenDecoded);
        router.push({ name: 'home' });
      } else {
        // Handle login failure
        showNotification('error',response.message);
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      showNotification('error','An error occurred during login. Please try again later.');
    });
};
</script>
