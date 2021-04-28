<template>
  <q-page class="">
    <div class="row justify-center items-center q-px-lg">
      <div class="col-8">
        <h4>Your Top Artists</h4>
      </div>
      <div class="col">
        <q-btn 
          @click="login" 
          color="secondary" 
          class="col-4 q-px-xl q-py-xs"
          rounded
          center
          label="Discover New Arists" 
        />
      </div>
    </div>
    <div class="row justify-center">
      <ul>
        <li v-for="artist in topArtists" :key="artist.id">
          {{ artist.name }}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from '@vue/composition-api';
import { getUserTopArtists } from '../requests';
import { userStore } from '../store/UserStore';


export default defineComponent({
  name: 'TopArtists',
  setup() {
    const topArtists = reactive(userStore.getState().topArtists)

    onMounted(() => {
      if (userStore.getState().topArtists.length > 1) {
        getUserTopArtists().then((res) => {
          userStore.setTopArtists(res.data.items);
          topArtists = userStore.getState().topArtists
        })
      }
    })

    return { topArtists }
  }
})
</script>