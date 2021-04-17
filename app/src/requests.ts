import axios from 'axios'
import * as keys from '../secret.json'

// Api keys
const token = keys.token

// Base URL stuff
const urlBase = 'https://api.spotify.com/'
const urlVersion = 'v1/'

const url = urlBase + urlVersion

const genericGetRequest = async (reqUrl: string) => {
    return axios.get(reqUrl, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

export const getUserTopArtists = async () => {
    const reqUrl = url + 'me/top/artists'
    return genericGetRequest(reqUrl)
}

export const getUserTopTracks = async () => {
    const reqUrl = url + 'me/top/tracks'
    return genericGetRequest(reqUrl)
}