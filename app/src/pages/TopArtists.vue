<template>
  <q-page class="">
    <div class="row justify-center items-center q-px-lg">
      <div class="col-8">
        <h4>Your Top Artists</h4>
      </div>
      <div class="col">
        <q-btn 
          @click="printTopArists" 
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
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { getUserTopArtists } from '../requests';
import { setTopArtists, getTopArtists } from '../store/UserStore';
import { router } from '../router/index'


export default defineComponent({
  name: 'TopArtists',
  setup() {
    const topArtists = ref(getTopArtists);

    onMounted(() => {
      if (getTopArtists.value.length < 2) {
        getUserTopArtists().then((res) => {
          setTopArtists(res.data.items);
        }).catch(() => {
          router.push('/')
        })
      }
    })

    const printTopArists = () => {
      console.log(getTopArtists.value)
    }

    return { topArtists, printTopArists }
  }
})
</script>