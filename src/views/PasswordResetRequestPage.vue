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

<script>
import { ref, computed } from 'vue';
import { useAccounts } from '@/composables/useAccounts.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { isLoggedIn, email, sendPasswordResetRequest } = useAccounts();
    const router = useRouter();
    const notification = ref({ show: false, type: '', message: '' });
    const usernameOrEmail = ref(isLoggedIn.value ? email.value : '');
    
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
          notification.value = {
            show: true,
            type: 'success',
            message: response.message
          };
        } else {
          notification.value = {
            show: true,
            type: 'error',
            message: response.message
          };
        }
      } catch (error) {
        console.error('Error requesting password reset:', error);
        notification.value = {
          show: true,
          type: 'error',
          message: 'An error occurred while processing your request. Please try again later.'
        };
      }
    };

    return {
      usernameOrEmail,
      usernameOrEmailRules,
      notification,
      requestPasswordReset
    };
  }
};
</script>
