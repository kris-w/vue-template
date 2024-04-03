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

    const isLoggedIn = computed(() => {
        return tokenSet.value && tokenDecoded.value && !isTokenExpired(tokenDecoded.value.exp);
    });

    // Computed property to check if the user has admin role
    const isAdmin = computed(() => {
        return isLoggedIn.value && tokenDecoded.value.roles && tokenDecoded.value.roles.includes('admin');
    });

    // Helper function to check if token is expired
    function isTokenExpired(expiration) {
        const currentTime = Math.floor(Date.now() / 1000);
        return expiration < currentTime;
    }

    // Computed property to get the username if the user is logged in
    const username = computed(() => tokenDecoded.value ? tokenDecoded.value.username : null);

    // Function to get the email if the user is logged in
    function getEmail() {
        return tokenDecoded.value ? tokenDecoded.value.email : null;
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
    

    async function sendPasswordResetRequest(email) {
        try {
            const params = { email };
            const response = await configuredAxios.post(`${apiUrl}/api/auth/password/reset/request`, params);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Error sending password reset request:", error);
            return { success: false, message: "Error sending password reset request. Please try again." };
        }
    }

    async function attemptPasswordReset(token, newPassword) {
        try {
            const params = { token, newPassword };
            const response = await configuredAxios.post(`${apiUrl}/api/auth/password/reset`, params);
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Error attempting password reset:", error);
            return { success: false, message: "Error resetting password. Please try again." };
        }
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
        getEmail,
    };
}
