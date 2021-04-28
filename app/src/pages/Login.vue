<template>
  <q-page class="column justify-start bg-dark">
    <div class="column items-center">
      <h2 class="q-pt-xl">Spotify Analytics</h2>
      <p class="text-body1 q-pb-xl">See your favorite artists and tracks</p>
    </div>
    <div class="row justify-center">
      <q-btn 
        @click="login" 
        color="secondary" 
        class="q-px-xl q-py-xs"
        rounded
        center
        label="Login to Spotify" 
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { loginRequest, makeChallenge, makeSha, requestAccesToken } from '../requests'
import { setChallenge, setToken, getChallenge } from '../store/UserStore' 
import { router } from '../router/index'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const login = () => {
      const challenge = makeChallenge(50)
      const sha = makeSha(challenge)
      setChallenge(challenge)
      const link = loginRequest(challenge, sha)
      window.location.href = link
    }

    onMounted(() => {
      const authCode: string = router.currentRoute.query.code
      const state: string = router.currentRoute.query.state

      if (authCode == undefined) {
        return
      }

      if (state != undefined) {
        setChallenge(state)
      }

      if (authCode.length > 1) {
        const challenge = getChallenge.value
        requestAccesToken(authCode, challenge).then((res) => {
          setToken(res.data.access_token)
          router.push('/profile/TopArtists')
        })
        .catch(err => {
          console.log(err)
        })
      }
    })

    return { login }
  }
  
});
</script>
