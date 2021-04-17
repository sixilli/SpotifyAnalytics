<template>
  <q-page class="row items-center justify-evenly">
    <p>Top Artists</p>
    <ul>
      <li v-for="artist in topArtists" :key="artist.id">
        {{ artist.name }}
      </li>
    </ul>
    <p>Top Tracks</p>
    <ul>
      <li v-for="track in topTracks" :key="track.id">
        {{ track.name }}
      </li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import { getUserTopArtists, getUserTopTracks } from "../requests"

export default defineComponent({
  name: 'PageIndex',
  components: { },
  setup() {
    const topArtists = ref(null)
    const topTracks = ref(null)

    onMounted(() => {
        getUserTopArtists().then((res) => {
          topArtists.value = res.data.items  
        })
        .catch(err => {
          console.log(err)
        })

        getUserTopTracks().then((res) => {
          topTracks.value = res.data.items
        })
        .catch(err => {
          console.log(err)
        })
    });

    return { topArtists, topTracks };
  }
  
});
</script>
