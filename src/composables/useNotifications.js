// composables/useNotifications.js
import { ref } from 'vue';

export function useNotification() {
  const notification = ref({ show: false, type: '', message: '' });

  function showNotification(type, message) {
    notification.value = { show: true, type, message };
  }

  function hideNotification() {
    notification.value.show = false;
  }

  return {
    notification,
    showNotification,
    hideNotification,
  };
}