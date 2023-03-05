import {request} from "../utils/utils";
import {userReducer} from "./reducers/userReducer";
import {getCookie} from "../utils/utils";

const urlData = 'ingredients';
const urlOrder = 'orders';

const urlLogin = 'auth/login';
const urlRegister = 'auth/register';
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

export const getUserInfoRequest = async ({accessToken}) => {
  return await request(userReducer(), {
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
  return await request(userReducer(), {
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
