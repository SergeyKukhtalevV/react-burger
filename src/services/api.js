import {request} from "../utils/utils";

const urlData = 'ingredients';
const urlOrder = 'orders';

const urlLogin = 'login';
const urlRegister = 'register';
export const urlLogout = 'logout';
export const urlToken = 'token';

export const getIngredientsRequest = async () => {
  return await request(urlData);
}

export const getOrderNumberRequest = async (orderInfo) => {
  return await request(urlOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": orderInfo
      })
  });
}

export const setRegisterUserRequest = async ({email, password, name}) => {
  return await request(urlRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  });
}

export const getAuthUserRequest = async ({email, password}) => {
  return await request(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
}

export const getTokenRequest = async ({url, refreshToken}) => {
  return await request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': refreshToken
    })
  });
}
