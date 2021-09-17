<template>
  <div v-if="!loading">
    <q-page class="column justify-start login-bg">
      <div class="column items-center">
        <h2 class="q-pt-xl text-center">Spotify Analytics</h2>
        <p class="text-body1 q-pb-xl">See your recent favorite artists and tracks.</p>
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
      <div class="q-py-lg row justify-center">
        <q-btn 
          @click="preview" 
          color="accent" 
          class="q-px-xl q-py-xs"
          rounded
          center
          label="Preview" 
        />
      </div>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { loginRequest, makeChallenge, makeSha, requestAccesToken } from '../requests';
import { setChallenge, setToken, getChallenge, setPreview } from '../store/UserStore' ;
import { router } from '../router/index';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const loading = ref(true)
    const login = () => {
      const challenge = makeChallenge(50);
      const sha = makeSha(challenge);
      setChallenge(challenge);
      const link = loginRequest(challenge, sha);
      window.location.href = link;
    }

    const preview = () => {
      setPreview();
      router.push('/profile/Top');
    }

    onMounted(() => {
      const queryParams = router.currentRoute.query;

      const authCode: string  = Boolean(queryParams.code) ? queryParams.code.toString() : '';
      const state: string  = Boolean(queryParams.state) ? queryParams.state.toString() : '';

      if (!authCode) {
        loading.value = false;
        return;
      }

      if (state != undefined) {
        setChallenge(state);
      }

      if (authCode.length > 1) {
        const challenge = getChallenge.value
        requestAccesToken(authCode, challenge).then((res) => {
          setToken(res.data.access_token);
          router.push('/profile/Top');
        })
        .catch(err => {
          console.log(err);
        })
      }
    });

    return { login, preview, loading };
  }
  
});
</script>

<style scoped lang="scss">
  .my-card {
    background: rgb(2,0,36);
  }
</style>