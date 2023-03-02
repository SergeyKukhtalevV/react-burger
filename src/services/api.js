import {request} from "../utils/utils";

const urlData = 'ingredients';
const urlOrder = 'orders';

const urlLogin = 'login';
const urlRegister = 'register';
const urlLogout = 'logout';
const urlToken = 'token';

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
