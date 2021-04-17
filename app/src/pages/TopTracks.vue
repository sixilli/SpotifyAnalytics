<template>
  <q-page>
    <h3>Top Tracks</h3>

    <ul>
      <li v-for="track in topTracks" :key="track.id">
        {{ track.name }}
      </li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'TopTracks',
  components: { },

  // TODO feed data in topTracks. Data will be an array of objects.
  // now there is currently dummy data
  setup() {
    const topTracks = ref([{id: 1, name: "Spiderman"}, {id: 2, name: "Something by Lizzo"}])

    return { topTracks }
  }
}) 
</script>