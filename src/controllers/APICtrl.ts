import Cookies from 'universal-cookie'

import { tokenCookieName } from '../__env'

const getToken = () => {

  const cookie = new Cookies()

  return cookie.get(tokenCookieName)

}

export const getApiJson = async (url: string, token?: string) => {

  // check token
  token = token ? token : getToken()

  const response = await fetch(url, {

    method: 'GET',

    headers: {

      'Content-type': 'application/json',

      'Authorization': `Bearer ${token}`

    }

  })

  const responseJson = await response.json()

  return responseJson

}

export const postApiJson = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const response = await fetch(url, {

    method: 'POST',

    headers: {

      'Content-type': 'application/json',

      'Authorization': `Bearer ${token}`

    },

    body: JSON.stringify(data)

  })

  const responseJson = await response.json()

  return responseJson

}

export const patchApiJson = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const response = await fetch(url, {

    method: 'PATCH',

    headers: {

      'Content-type': 'application/json',

      'Authorization': `Bearer ${token}`

    },

    body: JSON.stringify(data)

  })

  const responseJson = await response.json()

  return responseJson

}

export const putApiJson = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const response = await fetch(url, {

    method: 'PUT',

    headers: {

      'Content-type': 'application/json',

      'Authorization': `Bearer ${token}`

    },

    body: JSON.stringify(data)

  })

  const responseJson = await response.json()

  return responseJson

}

export const deleteApiJson = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const response = await fetch(url, {

    method: 'DELETE',

    headers: {

      'Content-type': 'application/json',

      'Authorization': `Bearer ${token}`

    },

    body: JSON.stringify(data)

  })

  const responseJson = await response.json()

  return responseJson

}

export const postApiFormData = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const formData = new FormData();

  for (const name in data) {

    // @ts-ignore
    formData.append(name, data[name]);

  }

  const response = await fetch(url, {

    method: 'POST',

    headers: {

      'Authorization': `Bearer ${token}`

    },

    body: formData

  })

  const responseJson = await response.json()

  return responseJson

}

export const patchApiFormData = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const formData = new FormData();

  for (const name in data) {

    // @ts-ignore
    formData.append(name, data[name]);

  }

  const response = await fetch(url, {

    method: 'PATCH',

    headers: {

      'Authorization': `Bearer ${token}`

    },

    body: formData

  })

  const responseJson = await response.json()

  return responseJson

}

export const putApiFormData = async (url: string, data = {}, token?: string) => {

  // check token
  token = token ? token : getToken()

  const formData = new FormData();

  for (const name in data) {

    // @ts-ignore
    formData.append(name, data[name]);

  }

  const response = await fetch(url, {

    method: 'PUT',

    headers: {

      'Authorization': `Bearer ${token}`

    },

    body: formData

  })

  const responseJson = await response.json()

  return responseJson

}