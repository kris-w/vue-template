import { ref } from 'vue';
import configuredAxios from "@/utils/configuredAxios.js";

// Access the API URL from environment variable
const apiUrl = import.meta.env.VITE_APP_API_URL;

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

    function logout() {
        // Implementation for logout
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
    };
}
