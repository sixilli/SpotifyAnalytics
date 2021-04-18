<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="login" color="secondary" label="Login to Spotify" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { loginRequest, makeChallenge, makeSha, requestAccesToken } from '../requests'
import { userStore } from '../store/UserStore' 
import { router } from '../router/index'

export default defineComponent({
  name: 'Login',
  setup() {
    const login = () => {
      const challenge = makeChallenge(50)
      const sha = makeSha(challenge)
      userStore.setChallenge(challenge)
      const link = loginRequest(challenge, sha)
      window.location.href = link
    }

    onMounted(() => {
      const authCode = router.currentRoute.query.code
      const state = router.currentRoute.query.state

      if (authCode == undefined) {
        return
      }

      if (state != undefined) {
        userStore.setChallenge(state)
      }

      if (authCode.length > 1) {
        const challenge = userStore.getState().challenge
        requestAccesToken(authCode, challenge).then((res) => {
          userStore.setToken(res.data.access_token)
          router.push('TopArtists')
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
