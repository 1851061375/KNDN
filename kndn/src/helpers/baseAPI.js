import axios from 'axios'

import {CONFIG} from './config'

export const requestGET = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
      },
      url: `${CONFIG.GETWAY_URL}/${URL}`,
    })
    return res.data
  } catch (error) {
    return null
  }
}

export const requestPOST = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
      },
      url: `${CONFIG.GETWAY_URL}/${URL}`,
      data,
    })

    return res.data
  } catch (error) {
    return null
  }
}

export const requestGET_CHAT = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${CONFIG.CHAT_URL}/${URL}`,
    })
    return res.data
  } catch (error) {
    return null
  }
}

export const requestGET_URL = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      url: URL,
    })
    return res.data
  } catch (error) {
    return null
  }
}
