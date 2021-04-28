import { Store } from "./store";

interface UserData extends Object {
    token: string,
    challenge: string,
    topArtists: Object[],
    topTracks: Object[]
}

class UserStore extends Store<UserData> {
    protected data(): UserData {
        return {
            token: '',
            challenge: '',
            topArtists: [],
            topTracks: [],
        };
    }

    setToken(token: string) {
        this.state.token = token
    }

    setChallenge(challenge: string) {
        this.state.challenge = challenge
    }

    setTopArtists(artists: Object[]) {
        this.state.topArtists = artists
    }

    setTopTracks(tracks: Object[]) {
        this.state.topTracks = tracks
    }

    hasToken(): boolean {
        if (this.state.token.length >= 1) {
            return true;
        }

        return false;
    }
}

export const userStore: UserStore = new UserStore()