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
            <span @click="deleteUser(item)" class="icon-action" role="button" tabindex="0">
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
  </v-container>
</template>

<script setup>
  import { useUser } from '@/composables/useUser.js';
  import { ref, onMounted } from 'vue';

  const headers = [
    { title: 'Username', key: 'username' },
    { title: 'Email', key: 'email' },
    { title: 'Roles', key: 'roles' }, // Changed title and key for Roles column
    { title: 'Active', key: 'active' },
    { title: 'Actions', key: 'action', sortable: false }
  ];

  // Define reactive variables
  const users = ref([]);
  const loading = ref(false);
  const loadingText = ref('Loading...');
  const search = ref('');

  // Import and use the useUser composable
  const { getAllUsers } = useUser();

  // Setup hook for meta
  import { useMeta } from 'vue-meta';
  useMeta({
    title: 'Administration > All Users',
    htmlAttrs: { lang: 'en', amp: true }
  });

  // Fetch users when component is mounted
  onMounted(async () => {
    try {
      loading.value = true;
      const usersData = await getAllUsers();
      users.value = usersData;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      loading.value = false;
    }
  });

  // Function to delete a user
  const deleteUser = (user) => {
    // Implement delete functionality
  };
</script>

<style scoped>
/* Add your scoped styles here */
</style>
