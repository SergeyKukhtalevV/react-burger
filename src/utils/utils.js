import {URL_API} from "../constants/constants";


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
