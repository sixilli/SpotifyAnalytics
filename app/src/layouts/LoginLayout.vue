<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'LoginLayout',
  components: { },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(false);

    
    return {leftDrawerOpen, essentialLinks};
  }
});
</script>