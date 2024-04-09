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
import { ref, onMounted } from 'vue';
import { useAccounts } from '@/composables/useAccounts.js';
import { useRoute } from 'vue-router'; // Import useRoute from vue-router
import { useMeta } from 'vue-meta';
import { useNotification } from '@/composables/useNotifications.js';

const { attemptPasswordReset } = useAccounts();
const { notification, showNotification } = useNotification();
const resetData = ref({
  resetToken: null, // Initialize resetToken
  newPassword: null,
  confirmPassword: null,
});
const route = useRoute(); // Access the current route

useMeta({
    title: 'Reset my password',
    htmlAttrs: { lang: 'en', amp: true }
  });

// Extract reset token from the URL when the component is mounted
onMounted(() => {
  const token = route.query.token; // Get the reset token from the query parameters
  if (token) {
    resetData.value.resetToken = token; // Assign reset token to resetData object
  } else {
    // Handle case when reset token is not provided in the URL
    showNotification('error','Reset token not found');
    console.error('Reset token not found in the URL');
  }
});

const resetPassword = () => {
  // Check if newPassword and confirmPassword are not empty
  if (resetData.value.newPassword && resetData.value.confirmPassword) {
      // Check if newPassword matches confirmPassword
      if (resetData.value.newPassword === resetData.value.confirmPassword) {
      attemptPasswordReset(resetData.value.resetToken, resetData.value.newPassword, resetData.value.confirmPassword)
          .then(response => {
            if (response.success) {
              showNotification('success',response.message);
            } else {
              showNotification('error',response.message);
            }
          })
          .catch(error => {
            console.error('Error resetting password:', error);
            showNotification('error','An error occurred while resetting your password. Please try again later.');
          });
      } else {
        // If passwords do not match, show an error message\
        showNotification('error','Passwords do not match. Please make sure both passwords are identical.');
      }
  } else {
      // If newPassword or confirmPassword is empty, show an error message
      showNotification('error','Please enter both new password and confirm password.');
  }
};
</script>
