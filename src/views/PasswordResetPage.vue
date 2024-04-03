<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>Password Reset</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="resetPassword">
                <v-text-field v-model="resetPassword.password" label="New Password" type="password"></v-text-field>
                <v-text-field v-model="resetPassword.password2" label="Confirm New Password" type="password"></v-text-field>
                <v-btn type="submit" color="primary">Reset Password</v-btn>
              </v-form>
              <v-alert v-if="notification" :type="notification.type">{{ notification.message }}</v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAccounts } from '@/composables/useAccounts.js';
  
  export default {
    setup() {
      const { attemptPasswordReset } = useAccounts();
      const notification = ref(null);
  
      const resetPassword = () => {
        attemptPasswordReset(resetPassword.value.resetToken)
          .then(response => {
            // Handle success or failure response
            if (response.success) {
              notification.value = {
                type: 'success',
                message: 'Password reset successfully.'
              };
            } else {
              notification.value = {
                type: 'error',
                message: 'Failed to reset password. Please try again.'
              };
            }
          })
          .catch(error => {
            console.error('Error resetting password:', error);
            notification.value = {
              type: 'error',
              message: 'An error occurred while resetting your password. Please try again later.'
            };
          });
      };
  
      return {
        notification,
        resetPassword
      };
    }
  };
  </script>
  