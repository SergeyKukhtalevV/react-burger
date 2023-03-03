import {getAuthUserRequest, setRegisterUserRequest} from "../api";

export const SET_REGISTER_USER_REQUEST= 'SET_REGISTER_USER_REQUEST';
export const SET_REGISTER_USER_SUCCESS = 'SET_REGISTER_USER_SUCCESS';
export const SET_REGISTER_USER_FAILED = 'SET_REGISTER_USER_FAILED';

export const GET_AUTHORIZATION_USER_REQUEST = 'SET_AUTHORIZATION_USER_REQUEST';
export const GET_AUTHORIZATION_USER_SUCCESS = 'SET_AUTHORIZATION_USER_SUCCESS';
export const GET_AUTHORIZATION_USER_FAILED = 'SET_AUTHORIZATION_USER_FAILED';

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export const SET_LOGOUT_USER_REQUEST= 'SET_LOGOUT_USER_REQUEST';
export const SET_LOGOUT_USER_SUCCESS = 'SET_LOGOUT_USER_SUCCESS';
export const SET_LOGOUT_USER_FAILED = 'SET_LOGOUT_USER_FAILED';

export function getAuthUser(email, password) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTHORIZATION_USER_REQUEST
    });
    getAuthUserRequest({email, password}).then(res => {
      if (res) {
        dispatch({
          type: GET_AUTHORIZATION_USER_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_AUTHORIZATION_USER_FAILED
        });
      }
    }).catch(err => {
      console.log('Ошибка, запрос на авторизацию пользователя не выполнен', err);
    });
  };
}

export function setRegisterUser(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: SET_REGISTER_USER_REQUEST
    });
    setRegisterUserRequest({email, password, name}).then(res => {
      if (res) {
        dispatch({
          type: SET_REGISTER_USER_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: SET_REGISTER_USER_FAILED
        });
      }
    }).catch(err => {
      console.log('Ошибка, запрос на регистрацию пользователя не выполнен', err);
    });
  };
}
