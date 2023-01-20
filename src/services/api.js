import {URL_API} from '../constants/constants';

const urlData = `${URL_API}/ingredients`;
const urlOrder = `${URL_API}/orders`;


export const getIngredientsRequest = async () => {
  return await fetch(urlData)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
}

export const getOrderNumberRequest = async (orderInfo) => {
    let response = await fetch(urlOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": orderInfo
      })
    });
    return response.json();
}
