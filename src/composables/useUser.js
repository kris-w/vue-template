// src/composables/useUser.js

import axios from 'axios';

// Access the API URL from environment variable
const apiUrl = import.meta.env.VITE_APP_API_URL;

export function useUser() {
    async function getAllUsers() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${apiUrl}/api/admin/users`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data; // Return all users
        } catch (error) {
          console.error('Error fetching users:', error);
          throw new Error('Failed to fetch users data'); // Throw error if request fails
        }
      }    
 
    // Function to fetch user by ID
    async function getUserById(userId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/admin/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data; // Return user data
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user data'); // Throw error if request fails
      }
    }
  
    // Function to update user data
    async function updateUser(userData) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${apiUrl}/api/admin/users/${userData._id}`, userData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data; // Return updated user data
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user'); // Throw error if request fails
      }
    }

    async function deleteUser(userId) {
      // Function to delete user by ID
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${apiUrl}/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return { success: true, message: response.data.message };
      } catch (error) {
        return { success: false, message: 'Failed to delete user' };
        throw new Error('Failed to delete user'); // Throw error if request fails
      }
  }
  
    // Return functions to be used in components
    return {
      getAllUsers,
      getUserById,
      updateUser,
      deleteUser
    };
  }
