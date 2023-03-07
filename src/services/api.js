import {request} from "../utils/utils";

const urlData = 'ingredients';
const urlOrder = 'orders';

const urlLogin = 'auth/login';
const urlRegister = 'auth/register';
const urlPasReset = 'password-reset';
const urlUser = 'auth/user';
export const urlLogout = 'auth/logout';
export const urlToken = 'auth/token';

const urlPasswordResetRequest = 'password-reset';
const urlPasswordResetSuccess = 'password-reset/reset';

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

export const setRegisterUserRequest = async (data) => {
  return await request(urlRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name
    })
  });
}

export const getAuthUserRequest = async (data) => {
  return await request(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });
}

export const getUserNewPasswordRequest = async (data) => {
  return await request(urlPasReset, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email
    })
  });
}

export const setUserNewPasswordRequest = async (data) => {
  return await request(urlPasReset, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token
    })
  });
}

export const getUserInfoRequest = async ({accessToken}) => {
  return await request(urlUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
     }//,
    // body: JSON.stringify({
    //   email,
    //   password
    // })
  });
}

export const setUserInfoRequest = async ({accessToken, name, email, password}) => {
  return await request(urlUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      name,
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
