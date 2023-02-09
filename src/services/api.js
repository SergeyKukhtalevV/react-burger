import {request} from "../utils/utils";

const urlData = '/ingredients';
const urlOrder = '/orders';


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
