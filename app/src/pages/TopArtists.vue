<template>
  <q-page>
    <div class="row justify-center items-center text-center">
      <div class="col">
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
    <div class="row q-gutter-md justify-center">
      <div class="col-2" v-for="(artist, index) in topArtists" :key="artist.id">
        <q-card class="my-card" square>
          <q-img 
            :ratio=1
            :src=artist.images[0].url
            basic
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ artist.name }}
            </div>
          </q-img>
        </q-card>
        <div v-if="index % 5 == 0 && index > 0">
        </div>
      </div>
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