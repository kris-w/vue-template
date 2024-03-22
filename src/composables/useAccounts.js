import { ref,computed } from 'vue';
import configuredAxios from "@/utils/configuredAxios.js";
import { useTokens } from '@/composables/useTokens.js'; // Import useTokens composable

// Access the API URL from environment variable
const apiUrl = import.meta.env.VITE_APP_API_URL;

// Import the tokenSet variable from useTokens
const { tokenSet, token, tokenDecoded } = useTokens();


let newUser = ref({
    username: null,
    password: null,
    password2: null,
    email: null
});

let responseMessage = ref(null);

let resetPassword = ref({
    resetToken: null,
    password: null,
    password2: null,
});

export function useAccounts() {

    function resetNewUser() {
        newUser.value = {
            username: null,
            password: null,
            password2: null,
            email: null
        };
    }

    function resetResetPassword() {
        resetPassword.value = {
            resetToken: null,
            password: null,
            password2: null,
        };
    }

    // Computed property to check if the user is logged in
    const isLoggedIn = computed(() => tokenSet.value);

    // Computed property to get the username if the user is logged in
    const username = computed(() => tokenDecoded.value ? tokenDecoded.value.username.replace(/['"]+/g, '') : null);

    function isAdmin(userRoles) {
        return userRoles.includes('admin');
      }

    async function register() {
        console.log('Registering new account with data:', newUser.value);
        try {
            const params = newUser.value;
            const response = await configuredAxios.post(`${apiUrl}/api/auth/register`, params); // Use '/api/auth/register' instead of '/accounts'
            return { success: true, message: "Account created successfully" };
        } catch (error) {
            console.log("Error", error);
            return { success: false, message: "Error creating your account. Check your username and passwords and try again." };
        }
    }

    async function login(username, password) {
        try {
            const params = { username, password };
            const response = await configuredAxios.post(`${apiUrl}/api/auth/login`, params);
            return { success: true, payload: response.data }; // Assuming the response contains accessToken and decodedToken
        } catch (error) {
            console.error("Error:", error);
            return { success: false };
        }
    }

    async function logout() {
        try {
            await configuredAxios.post(`${apiUrl}/api/auth/logout`);
            // Clear user-related data
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tokenDecoded');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenDecoded');
            tokenSet.value = false; // <- Use tokenSet from useTokens
            token.value = null; // <- Define token here
            tokenDecoded.value = null; // <- You may not need to clear this here
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle logout error
        }
    }
    

    function sendPasswordResetRequest(email) {
        // Implementation for sending password reset request
    }

    function attemptPasswordReset(token) {
        // Implementation for attempting password reset
    }

    return {
        newUser,
        resetPassword,
        resetNewUser,
        resetResetPassword,
        register,
        login,
        logout,
        sendPasswordResetRequest,
        attemptPasswordReset,
        isAdmin,
        isLoggedIn,
        username,
    };
}
