import axios from 'axios'
import * as keys from '../secret.json'
import base64url from "base64url";
import { userStore } from './store/UserStore'

var crypto = require('crypto')


// Api keys
const clientId = keys.clientId
const token = keys.token

// Base URL stuff
const urlBase = 'https://api.spotify.com/'
const urlVersion = 'v1/'

const url = urlBase + urlVersion

// Scopes for spotify API
const scopes = 'user-top-read'
const redirectUri = 'http://localhost:8080'


const genericGetRequest = async (reqUrl: string) => {
    const userToken = userStore.getState().token
    console.log(userToken)
    return axios.get(reqUrl, {
        headers: {
            'authorization': `Bearer ${userToken}`
        }
    })
}

// Returns a code that can be used to obtain an acces token
export const loginRequest = (challenge: string, verifier: string) => {
    const reqClientId= `&client_id=${clientId}`
    const reqScopes = `&scope=${scopes}`
    const reqCodeChallenge = `&code_challenge=${verifier}`
    const reqCodeChallengeMethod = `&code_challenge_method=${'S256'}`
    const reqRedirectUri = `&redirect_uri=${redirectUri}`
    const reqState = `&state=${challenge}`

    const loginUrl = `https://accounts.spotify.com/authorize?response_type=code${reqClientId}${reqScopes}${reqCodeChallenge}${reqCodeChallengeMethod}${reqRedirectUri}${reqState}` 

    return loginUrl
} 

export const requestAccesToken = async (authCode: string, sha: string) => {
    const reqUrl = 'https://accounts.spotify.com/api/token'

    const params = new URLSearchParams()
    params.append('client_id', clientId)
    params.append('grant_type', 'authorization_code')
    params.append('code', authCode)
    params.append('redirect_uri', redirectUri)
    params.append('code_verifier', sha)

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return axios.post(reqUrl, params, config)
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
    let result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

export const makeSha = (challenge: string) => {
    return base64url.fromBase64(crypto.createHash('sha256').update(challenge).digest('base64'))
}
