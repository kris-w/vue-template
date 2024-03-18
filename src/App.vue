<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ${siteName}` : siteName }}</template>
  </metainfo>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>

</template>

<script setup>
  // Import DefaultLayout component if needed
  import DefaultLayout from './layouts/DefaultLayout.vue';
  
  import { ref, onMounted } from 'vue';

  // Define a ref to hold the value of VUE_APP_SITE_NAME
  const siteName = ref('');

  // Load the environment variable on component mount
  onMounted(() => {
    siteName.value = import.meta.env.VITE_APP_SITE_NAME;
  });

  // Setup hook for meta
  import { useMeta } from 'vue-meta';
  useMeta({
    title: 'PAGE NAME',
    htmlAttrs: { lang: 'en', amp: true }
  });
</script>


/*

Override meta in each component
Vue 3 vanilla:

import { useMeta } from 'vue-meta'

export default {
  setup () {
    useMeta({ title: 'Some Page' })
  }
}
or with vue-class-component:

import { computed } from '@vue/runtime-core'
import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

export default class SomePage extends Vue {
  meta = setup(() => useMeta(
    computed(() => ({ title: this.something?.field ?? 'Default' })))
  )
}
*/