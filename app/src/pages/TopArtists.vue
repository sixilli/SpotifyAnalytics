<template>
    <q-page>
        <h3>Top Artists</h3>
        <ul>
            <li v-for="artist in topArtists" :key="artist.id">
                {{ artist.name }}
            </li>
        </ul>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { getUserTopArtists } from '../requests'


export default defineComponent({
  name: 'TopArtists',
  setup() {
    const topArtists = ref(null)

    onMounted(() => {
        getUserTopArtists().then((res) => {
            console.log(res.data)
            topArtists.value = res.data.items
        })
    })
    return { topArtists }
  }
})
</script>