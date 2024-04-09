<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>Password Reset Request</v-card-title>
          <v-card-text>
            <p>Are you sure you want to request a password reset for your account?</p>
            <v-form @submit.prevent="requestPasswordReset">
              <v-text-field v-model="usernameOrEmail" label="Username or Email" required :disabled="isLoggedIn" :rules="usernameOrEmailRules"></v-text-field>
              <v-btn type="submit" color="primary">Request Password Reset</v-btn>
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
import { ref, computed } from 'vue';
import { useAccounts } from '@/composables/useAccounts.js';
import { useRouter } from 'vue-router';
import { useNotification } from '@/composables/useNotifications.js';
import { useMeta } from 'vue-meta';

const { isLoggedIn, email, sendPasswordResetRequest } = useAccounts();
const router = useRouter();
const { notification, showNotification } = useNotification();
const usernameOrEmail = ref(isLoggedIn.value ? email.value : '');

useMeta({
    title: 'Request a password reset',
    htmlAttrs: { lang: 'en', amp: true }
  });

// Rules for the username or email field
const usernameOrEmailRules = computed(() => {
  return [
    v => !!v || 'Username or Email is required',
  ];
});

const requestPasswordReset = async () => {
  try {
    const response = await sendPasswordResetRequest(usernameOrEmail.value);
    if (response.success) {
      showNotification('success',response.message);
    } else {
      showNotification('error',response.message);
    }
  } catch (error) {
    console.error('Error requesting password reset:', error);
    showNotification('error','An error occurred while processing your request. Please try again later.');
  }
};
</script>
