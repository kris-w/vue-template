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
            <span @click="editUser(item)" class="icon-action" role="button" tabindex="0">
              <v-icon color="primary">mdi-pencil</v-icon>
              <span class="sr-only">Edit</span>
            </span>
            <span @click="deleteUser(item)" class="icon-action" role="button" tabindex="0">
              <v-icon color="error">mdi-delete</v-icon>
              <span class="sr-only">Delete</span>
            </span>       
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

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
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/admin/users`, {

          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },
    editUser(user) {
      // Implement edit functionality
    },
    deleteUser(user) {
      // Implement delete functionality
    }
  }
};
</script>

<style scoped>
.icon-action {
  cursor: pointer;
  display: inline-block;
  margin-right: 10px; /* Adjust as needed */
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
