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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useUser } from '@/composables/useUser.js';

  export default {
    data() {
      return {
        headers: [
          { text: 'Username', value: 'username' },
          { text: 'Email', value: 'email' },
          { text: 'Role', value: 'role' },
          { text: 'Actions', value: 'action', sortable: false }
        ],
        users: [],
        loading: false,
        loadingText: 'Loading...',
        search: ''
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      async getUsers() {
        try {
          this.loading = true;
          const { getAllUsers } = useUser(); // Destructure getAllUsers from useUser
          const users = await getAllUsers(); // Use getAllUsers function
          this.users = users;
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          this.loading = false;
        }
      },
      deleteUser(user) {
        // Implement delete functionality
      }
    }
  };
</script>

<style scoped>
/* Add your scoped styles here */
</style>
