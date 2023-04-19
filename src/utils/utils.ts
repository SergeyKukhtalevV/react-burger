import {URL_API} from "../constants/constants";
import {getTokenRequest, urlToken} from "../services/api";

export type TOptionHeaders = {
  readonly 'Content-Type': string;
  Authorization?: string;
};

export type TOption<TOptionHeaders> = {
  readonly method: string;
  headers: TOptionHeaders;
  readonly body?: string;
};

export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const request = (endPoint: string, options?: TOption<TOptionHeaders>) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(URL_API + endPoint, options).then(checkResponse);
}

//******
export const fetchWithRefresh = async (url: string, options: TOption<TOptionHeaders>)=> {
  try {
    return await request(url, options);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData: any = await getTokenRequest(urlToken, {token: getCookie('token')!});
      if (!refreshData.success) {
        await Promise.reject(refreshData);
      }
      setCookie('token', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      return await request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};

//*******

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, props?: any): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, null, {expires: -1});
}
