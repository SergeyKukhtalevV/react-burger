import {fetchWithRefresh, request} from "../utils/utils";
import {TIngredient} from "./types/ingredientTypes";

const urlData = 'ingredients';
const urlOrder = 'orders';
const urlLogin = 'auth/login';
const urlRegister = 'auth/register';
const urlPasReset = 'password-reset';
const urlUser = 'auth/user';
export const urlLogout = 'auth/logout';
export const urlToken = 'auth/token';

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

export const getIngredientsRequest = async (): Promise<TResponseBody<'data', ReadonlyArray<TIngredient>>> => {
  return await request(urlData);
}

export const getOrderNumberRequest = async (accessToken, orderInfo) => {
  return await fetchWithRefresh(urlOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
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
  return await fetchWithRefresh(urlPasReset, {
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

export const getUserInfoRequest = async (data) => {
  return await fetchWithRefresh(urlUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data.accessToken
     }
  });
}

export const setUserInfoRequest = async (data) => {
  return await fetchWithRefresh(urlUser, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data.accessToken
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    })
  });
}

export const getTokenRequest = async (url, data) => {
  return await request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: data.token
    })
  });
}

