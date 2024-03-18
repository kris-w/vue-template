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

const vuetify = createVuetify({
  components,
  directives,
})

// Import Vuetify styles
import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);
app.use(router);
app.use(createMetaManager());
app.use(vuetify);
app.mount('#app');
