import {URL_API} from '../constants/constants';

const urlData = `${URL_API}/ingredients`;


export const getIngredientsRequest = async () => {
  return await fetch(urlData)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
}
