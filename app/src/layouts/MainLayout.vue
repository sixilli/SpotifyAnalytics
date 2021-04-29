<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-toolbar-title>
          Spotify Analytics
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container class="bg-dark full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { },
  setup() {
    return { }
  }
});
</script>
