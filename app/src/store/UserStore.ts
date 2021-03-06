import { ref, Ref, computed } from '@vue/composition-api';
import { topArtistsPreview, topTracksPreview } from '../assets/sampleData';

interface userStore {
    token: string,
    challenge: string,
    topArtists: unknown[],
    topTracks: unknown[],
    preview: boolean,
}

const state = ref({
        token: '',
        challenge: '',
        topArtists: [],
        topTracks: [],
        preview: false,
}) as unknown as Ref<userStore> 

export const setToken= (token: string) => {
    state.value.token = token;
}

export const setChallenge = (challenge: string) => {
    state.value.challenge = challenge;
}

export const setTopArtists = (artists: unknown[]) => {
    state.value.topArtists = artists;
}

export const setTopTracks = (tracks: unknown[]) => {
    state.value.topTracks = tracks;
}

export const hasToken = (): boolean => {
    if (state.value.token.length >= 1) {
        return true;
    }

    return false;
}

export const setPreview = () => {
    state.value.preview = true;
    setToken('Some cool token :D');

    state.value.topArtists = topArtistsPreview;
    state.value.topTracks = topTracksPreview;
}

export const getChallenge = computed(() => state.value.challenge);

export const getTopArtists = computed(() => state.value.topArtists);

export const getTopTracks = computed(() => state.value.topTracks);

export const userToken = computed(() => state.value.token);

export const getPreview = computed(() => state.value.preview);
