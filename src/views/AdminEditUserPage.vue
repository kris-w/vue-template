<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card v-if="user">
            <v-card-title>User Profile</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="saveChanges">
                <v-text-field v-model="user.username" label="Username" disabled></v-text-field>
                <v-text-field v-model="user.email" label="Email" disabled></v-text-field>
                <!-- Add fields for other user attributes such as active status, date created, date modified -->
                <v-btn type="submit" color="primary">Save Changes</v-btn>
              </v-form>
              <v-alert v-if="notification" :type="notification.type">{{ notification.message }}</v-alert>
            </v-card-text>
          </v-card>
          <v-alert v-else type="error">User not found</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useUser } from '@/composables/useUser.js';
    
    const { getUserById, updateUser } = useUser();
    const router = useRouter();
    const route = useRoute();
    
    const userId = ref(route.params.userId); // Assuming userId is passed as a route parameter
    const user = ref(null);
    const notification = ref(null);

    // Fetch user data when component is mounted
    onMounted(async () => {
        try {
            getUserData();
        } catch (error) {
            console.error('Error fetching user:', error);
        } 
    });    


    async function getUserData() {
        try {
            const response = await getUserById(userId.value);
            user.value = response;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    
    async function saveChanges() {
        try {
        const response = await updateUser(user.value);
        console.log('User updated:', response.data);
        notification.value = {
            type: 'success',
            message: 'User profile updated successfully.'
        };
        } catch (error) {
        console.error('Error updating user profile:', error);
        notification.value = {
            type: 'error',
            message: 'An error occurred while saving changes. Please try again later.'
        };
        }
    }
  </script>
  