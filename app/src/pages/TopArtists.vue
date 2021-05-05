<template>
  <q-page>
    <div class="row justify-center items-center text-center">
      <div class="col">
        <h4>Your Top Artists</h4>
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
    <div class="row justify-center items-center text-center">
      <div class="col">
        <h4>Your Top Tracks</h4>
      </div>
    </div>
    <div class="row q-gutter-md justify-center q-mb-lg" v-if="topTracks.length > 1">
      <div class="col-2" v-for="(track, index) in topTracks" :key="track.id">
        <q-card class="my-card" square>
          <q-img 
            :ratio=1
            :src=track.album.images[0].url
            basic
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ track.name }} by {{ createArtistList(track.artists) }}
            </div>
          </q-img>
        </q-card>
        <div v-if="index % 5 == 0 && index > 0"></div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { getUserTopArtists, getUserTopTracks } from '../requests';
import { setTopArtists, getTopArtists, getTopTracks, setTopTracks } from '../store/UserStore';
import { router } from '../router/index'


export default defineComponent({
  name: 'TopArtists',
  setup() {
    const topArtists = ref(getTopArtists);
    const topTracks = ref(getTopTracks);

    // Returns a string of artists to display along top track names
    const createArtistList = (artistArray: any): string => {
      let trackArtists = ''
      for (let i = 0; i < artistArray.length; i++) {
        if (artistArray.length == 1) {
          trackArtists += artistArray[i].name;
          return trackArtists;
        }

        if (i == artistArray.length - 1) {
          trackArtists += artistArray[i].name;
          continue;
        }

        trackArtists += artistArray[i].name + ', ';
      }

      return trackArtists;
    }

    // Request top tracks/artists and update state store
    onMounted(() => {
      if (getTopArtists.value.length < 2) {
        getUserTopArtists().then((res) => {
          setTopArtists(res.data.items);
        }).catch(() => {
          router.push('/');
        })
      }

      if (getTopTracks.value.length < 2) {
        getUserTopTracks().then((res) => {
          setTopTracks(res.data.items);
        }).catch(() => {
          router.push('/');
        })
      }
    })

    return { topArtists, topTracks, createArtistList }
  }
})
</script>