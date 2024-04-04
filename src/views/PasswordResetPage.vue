<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>Password Reset</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="resetPassword">
                <v-text-field v-model="resetData.newPassword" label="New Password" type="password"></v-text-field>
                <v-text-field v-model="resetData.confirmPassword" label="Confirm New Password" type="password"></v-text-field>
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
  import { ref, onMounted } from 'vue';
  import { useAccounts } from '@/composables/useAccounts.js';
  import { useRoute } from 'vue-router'; // Import useRoute from vue-router
  
  export default {
    setup() {
      const { attemptPasswordReset } = useAccounts();
      const notification = ref(null);
      const resetData = ref({
        resetToken: null, // Initialize resetToken
        newPassword: null,
        confirmPassword: null,
      });
      const route = useRoute(); // Access the current route
  
      // Extract reset token from the URL when the component is mounted
      onMounted(() => {
        const token = route.query.token; // Get the reset token from the query parameters
        if (token) {
          resetData.value.resetToken = token; // Assign reset token to resetData object
        } else {
          // Handle case when reset token is not provided in the URL
          console.error('Reset token not found in the URL');
          // You may want to redirect the user to an error page or handle it differently
        }
      });
  
      const resetPassword = () => {
        // Check if newPassword and confirmPassword are not empty
        if (resetData.value.newPassword && resetData.value.confirmPassword) {
            // Check if newPassword matches confirmPassword
            if (resetData.value.newPassword === resetData.value.confirmPassword) {
            attemptPasswordReset(resetData.value.resetToken, resetData.value.newPassword, resetData.value.confirmPassword)
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
            } else {
            // If passwords do not match, show an error message
            notification.value = {
                type: 'error',
                message: 'Passwords do not match. Please make sure both passwords are identical.'
            };
            }
        } else {
            // If newPassword or confirmPassword is empty, show an error message
            notification.value = {
            type: 'error',
            message: 'Please enter both new password and confirm password.'
            };
        }
        };

  
      return {
        notification,
        resetData,
        resetPassword
      };
    }
  };
  </script>
  