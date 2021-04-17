import axios from 'axios'
import * as keys from '../secret.json'

// Api keys
const clientId = keys.clientId
const token = keys.token

// Base URL stuff
const urlBase = 'https://api.spotify.com/'
const urlVersion = 'v1/'

const url = urlBase + urlVersion

// Scopes for spotify API
const scopes = 'user-top-read'
const redirectUri = 'http%3A%2F%2Flocalhost:8080'


const genericGetRequest = async (reqUrl: string) => {
    return axios.get(reqUrl, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

// Returns a code that can be used to obtain an acces token
export const loginRequest = async (challenge: string) => {
    const reqClientId= `&client_id=${clientId}`
    const reqScopes = `&scope=${scopes}`
    const reqCodeChallenge = `&code_challenge=${makeChallenge(50)}`
    const reqCodeChallengeMethod = `&code_challenge_method=${'S256'}`
    const reqRedirectUri = `&redirect_uri=${redirectUri}`

    const loginUrl = `https://accounts.spotify.com/authorize?response_type=code${reqClientId}${reqScopes}${reqCodeChallenge}${reqCodeChallengeMethod}${reqRedirectUri}` 

    return axios.get(loginUrl)
} 

export const requestAccesToken = async (code: string) => {
    const reqClientId= `&client_id=${clientId}`
    const reqRedirectUri = `&redirect_uri=${redirectUri}`

    const reqUrl = 'https://accounts.spotify.com/api/token'
}

export const getUserTopArtists = async () => {
    const reqUrl = url + 'me/top/artists'
    return genericGetRequest(reqUrl)
}

export const getUserTopTracks = async () => {
    const reqUrl = url + 'me/top/tracks'
    return genericGetRequest(reqUrl)
}

export const makeChallenge = (length: number) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}
