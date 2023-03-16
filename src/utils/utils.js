import {URL_API} from "../constants/constants";
import {getTokenRequest, urlToken} from "../services/api";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const  request = (endPoint, options) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(URL_API+endPoint, options).then(checkResponse);
}

//******
export const fetchWithRefresh = async (url, options) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await getTokenRequest(urlToken, {token: getCookie('token')});
      if (!refreshData.success) {
        await Promise.reject(refreshData);
      }
      setCookie('token', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};
//*******

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
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

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
