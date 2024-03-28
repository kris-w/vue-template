import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createMetaManager } from 'vue-meta';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

console.log("Router instance:", router); // Log the router instance

// Import Vuetify styles and Material Design Icons CSS
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

import '@/assets/scss/global.scss';

const myCustomLightTheme = {
  "dark": false,
  "colors": {
    "background": "#F5F5F5",
    "surface": "#FFFFFF",
    "primary": "#6EA083",
    "secondary": "#9CB0A4",
    "error": "#F44336",
    "info": "#569FB7",
    "success": "#4CAF50",
    "warning": "#FFC107"
  }
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },  
  components,
  directives,
})

const app = createApp(App);
app.use(router);
app.use(createMetaManager());
app.use(vuetify);
app.mount('#app');
