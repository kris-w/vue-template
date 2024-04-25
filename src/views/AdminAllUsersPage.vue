<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :loading="loading"
          :loading-text="loadingText"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>All Users</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <!-- Conditionally show the delete icon -->
            <span v-if="item._id !== currentUserId" @click="initDeleteUser(item)" class="icon-action" role="button" tabindex="0">
              <v-icon color="error">mdi-delete</v-icon>
              <span class="sr-only">Delete</span>
            </span>
          </template>
          <!-- Link the username to the edit user page -->
          <template v-slot:item.username="{ item }">
            <router-link :to="{ name: 'UserProfile', params: { userId: item._id } }">
              {{ item.username }}
            </router-link>
          </template>
          <!-- Display the Active column -->
          <template v-slot:item.active="{ item }">
            <v-chip :color="item.active ? 'success' : 'error'" label>{{ item.active ? 'Active' : 'Inactive' }}</v-chip>
          </template>  
          <!-- Display the Roles column -->
          <template v-slot:item.roles="{ item }">
            {{ item.roles.join(', ') }}
          </template>        
        </v-data-table>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="notification.show"
      :timeout="5000"
      :color="notification.type === 'success' ? 'success' : 'error'"
    >
      {{ notification.message }}
    </v-snackbar>

    <!-- Deletion confirmation dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Delete User</v-card-title>
        <v-card-text>
          Are you sure you want to delete <strong>{{ username }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="confirmDeleteUser">Confirm</v-btn>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useUser } from '@/composables/useUser.js';
import { ref, onMounted } from 'vue';
import { useNotification } from '@/composables/useNotifications.js';
import { useAccounts } from '@/composables/useAccounts.js'; // Import useAccounts composable

// Define reactive variables
const users = ref([]);
const loading = ref(false);
const loadingText = ref('Loading...');
const search = ref('');
const deleteDialog = ref(false); // Dialog to confirm deletion
const deleteUserId = ref(null); // User ID to delete
const username = ref(''); // Username to display in the deletion confirmation dialog
const { getAllUsers, deleteUser } = useUser(); // Import useUser composable
const { notification, showNotification } = useNotification(); // Import useNotification composable
const account = useAccounts();
const currentUserId=account.userId.value;

// Table headers
const headers = [
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Roles', key: 'roles' },
  { title: 'Active', key: 'active' },
  { title: 'Actions', key: 'action', sortable: false }
];

// Fetch users when component is mounted
onMounted(async () => {
  try {
    loading.value = true;
    users.value = await getAllUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
});

// Function to initiate user deletion
function initDeleteUser(user) {
  deleteUserId.value = user._id; // Set the deleteUserId to the ID of the user to be deleted
  username.value = user.username;
  deleteDialog.value = true;
}

// Function to confirm user deletion
async function confirmDeleteUser() {
  try {
    // Check if the user to be deleted is not the current user
    if (deleteUserId.value !== currentUserId) {
      const response = await deleteUser(deleteUserId.value);
      if (response.success) {
        showNotification('success', response.message);
        await reloadUserData();
      } else {
        showNotification('error', response.message);
      }
    } else {
      showNotification('error', 'You cannot delete your own account.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    showNotification('error', 'An error occurred while deleting the user. Please try again later.');
  } finally {
    deleteDialog.value = false;
  }
}

// Function to reload user data
async function reloadUserData() {
  try {
    loading.value = true;
    users.value = await getAllUsers();
  } catch (error) {
    console.error('Error reloading user data:', error);
  } finally {
    loading.value = false;
  }
}
</script>
