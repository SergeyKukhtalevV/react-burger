import {fetchWithRefresh, request} from "../utils/utils";
import {TIngredient} from "./types/ingredientTypes";
import {TOrder} from "./types/orderTypes";
import {
  TAuthUser, TAuthUserSuccess,
  TForgotPassUser,
  TGettingInfoUser,
  TNewPassUser,
  TNewToken,
  TRegisterUser, TResponseAuthUser, TResponseForgotUser, TResponseInfoUser, TResponseReFreshUser,
  TSettingInfoUser
} from "./types/userTypes";
import {URL_API} from "../constants/constants";

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
  success?: boolean;
  message?: string;
  headers?: Headers;
};

interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer?: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}


export const getIngredientsRequest = async (): Promise<TResponseBody<'data', Array<TIngredient>>> => {
  return await request(urlData);
}

export const getOrderNumberRequest = async (accessToken:string, orderInfo: string[]):
  Promise<TResponseBody<'order', TOrder>> => {
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

export const setRegisterUserRequest = async (data: TRegisterUser): Promise<TResponseBody<'data', TResponseAuthUser<TAuthUserSuccess>>> => {
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

export const getAuthUserRequest = async (data: TAuthUser): Promise<TResponseAuthUser<TAuthUserSuccess>> => {
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

export const getUserNewPasswordRequest = async (data: TForgotPassUser): Promise<TResponseBody<'data', TResponseForgotUser>> => {
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

export const setUserNewPasswordRequest = async (data: TNewPassUser): Promise<TResponseBody<'data', TResponseForgotUser>> => {
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

export const getUserInfoRequest = async (data: TGettingInfoUser): Promise<TResponseAuthUser<TAuthUserSuccess>> => {
  return await fetchWithRefresh(urlUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data.accessToken
     }
  });
}

export const setUserInfoRequest = async (data: TSettingInfoUser): Promise<TResponseBody<'data', TResponseInfoUser<TAuthUserSuccess>>> => {
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

export const getTokenRequest = async (url: string, data: TNewToken): Promise<TResponseBody<'data', TResponseReFreshUser>> => {
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

export const getLogoutUser = async (url: string, data: TNewToken): Promise<TResponseBody<'data', TResponseForgotUser>> => {
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
