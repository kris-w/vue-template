<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>Password Reset Request</v-card-title>
            <v-card-text>
              <p>Are you sure you want to request a password reset for your account?</p>
              <v-btn @click="requestPasswordReset" color="primary">Request Password Reset</v-btn>
              <v-alert v-if="notification" :type="notification.type">{{ notification.message }}</v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { useAccounts } from '@/composables/useAccounts.js';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const { getEmail, sendPasswordResetRequest } = useAccounts();
      const notification = ref(null);
  
      const requestPasswordReset = () => {
        const email = getEmail();
        if (email) {
          sendPasswordResetRequest(email)
            .then(response => {
              // Handle success or failure response
              if (response.success) {
                notification.value = {
                  type: 'success',
                  message: 'Password reset request sent successfully.'
                };
              } else {
                notification.value = {
                  type: 'error',
                  message: 'Failed to send password reset request. Please try again.'
                };
              }
            })
            .catch(error => {
              console.error('Error requesting password reset:', error);
              notification.value = {
                type: 'error',
                message: 'An error occurred while processing your request. Please try again later.'
              };
            });
        } else {
          notification.value = {
            type: 'error',
            message: 'Unable to retrieve email. Please try again.'
          };
        }
      };
  
      return {
        notification,
        requestPasswordReset
      };
    }
  };
  </script>
  