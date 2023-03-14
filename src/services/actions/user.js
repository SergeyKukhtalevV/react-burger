import {
  getAuthUserRequest,
  getTokenRequest,
  getUserInfoRequest, getUserNewPasswordRequest,
  setRegisterUserRequest,
  setUserInfoRequest, setUserNewPasswordRequest, urlLogout, urlToken
} from "../api";
import {getCookie} from "../../utils/utils";

export const SET_REGISTER_USER_REQUEST = 'SET_REGISTER_USER_REQUEST';
export const SET_REGISTER_USER_SUCCESS = 'SET_REGISTER_USER_SUCCESS';
export const SET_REGISTER_USER_FAILED = 'SET_REGISTER_USER_FAILED';

export const GET_AUTHORIZATION_USER_REQUEST = 'SET_AUTHORIZATION_USER_REQUEST';
export const GET_AUTHORIZATION_USER_SUCCESS = 'SET_AUTHORIZATION_USER_SUCCESS';
export const GET_AUTHORIZATION_USER_FAILED = 'SET_AUTHORIZATION_USER_FAILED';

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export const GET_LOGOUT_USER_REQUEST = 'GET_LOGOUT_USER_REQUEST';
export const GET_LOGOUT_USER_SUCCESS = 'GET_LOGOUT_USER_SUCCESS';
export const GET_LOGOUT_USER_FAILED = 'GET_LOGOUT_USER_FAILED';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const SET_USER_INFO_REQUEST = 'SET_USER_INFO_REQUEST';
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAILED = 'SET_USER_INFO_FAILED';

export const GET_USER_NEW_PASSWORD_REQUEST = 'GET_USER_NEW_PASSWORD_REQUEST';
export const GET_USER_NEW_PASSWORD_SUCCESS = 'GET_USER_NEW_PASSWORD_SUCCESS';
export const GET_USER_NEW_PASSWORD_FAILED = 'GET_USER_NEW_PASSWORD_FAILED';
export const GET_USER_NEW_PASSWORD_INIT = 'GET_USER_NEW_PASSWORD_INIT';

export const SET_USER_NEW_PASSWORD_REQUEST = 'SET_USER_NEW_PASSWORD_REQUEST';
export const SET_USER_NEW_PASSWORD_SUCCESS = 'SET_USER_NEW_PASSWORD_SUCCESS';
export const SET_USER_NEW_PASSWORD_FAILED = 'SET_USER_NEW_PASSWORD_FAILED';

export function getAuthUser(info) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTHORIZATION_USER_REQUEST
    });
    getAuthUserRequest(info).then(res => {
      dispatch({
        type: GET_AUTHORIZATION_USER_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: GET_AUTHORIZATION_USER_FAILED
      });
      console.log('Ошибка, запрос на авторизацию пользователя не выполнен', err);
    });
  };
}

export function setRegisterUser(info) {
  return function (dispatch) {
    dispatch({
      type: SET_REGISTER_USER_REQUEST
    });
    setRegisterUserRequest(info).then(res => {
      dispatch({
        type: SET_REGISTER_USER_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: SET_REGISTER_USER_FAILED
      });
      console.log('Ошибка, запрос на регистрацию пользователя не выполнен', err);
    });
  };
}

export function getUserInfo(data) {
  const token = getCookie('token');
  return function (dispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST
    });
    getUserInfoRequest(data).then(res => {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        data: res
      });
    }).catch(err => {
      if(token) {
        dispatch(getFreshToken({token}));
      }
      dispatch({
        type: GET_USER_INFO_FAILED
      });
      console.log('Ошибка, запрос на получения данных пользователя не выполнен', err);
    });
  };
}

export function getUserNewPassword(info) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_NEW_PASSWORD_REQUEST
    });
    getUserNewPasswordRequest(info).then(res => {
      dispatch({
        type: GET_USER_NEW_PASSWORD_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: GET_USER_NEW_PASSWORD_FAILED
      });
      console.log('Ошибка, запрос на восстановление пользователя не выполнен', err);
    });
  };
}

export function setUserNewPassword(info) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_NEW_PASSWORD_REQUEST
    });
    setUserNewPasswordRequest(info).then(res => {
      dispatch({
        type: SET_USER_NEW_PASSWORD_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: SET_USER_NEW_PASSWORD_FAILED
      });
      console.log('Ошибка, запрос на сохранение нового пароля пользователя не выполнен', err);
    });
  };
}

export function getLogOutUser(data) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_USER_REQUEST
    });
    getTokenRequest(urlLogout, data).then(res => {
      dispatch({
        type: GET_LOGOUT_USER_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: GET_LOGOUT_USER_FAILED
      });
      console.log('Ошибка, запрос на выход из системы не выполнен', err);
    });
  };
}
export function getFreshToken(data) {
  return function (dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST
    });
    getTokenRequest(urlToken, data).then(res => {
      dispatch({
        type: GET_REFRESH_TOKEN_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: GET_REFRESH_TOKEN_FAILED
      });
      console.log('Ошибка, запрос на обновление токена не выполнен', err);
    });
  };
}


export function setUserInfo(info) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_INFO_REQUEST
    });
    setUserInfoRequest(info).then(res => {
      dispatch({
        type: SET_USER_INFO_SUCCESS,
        data: res
      });
    }).catch(err => {
      dispatch({
        type: SET_USER_INFO_FAILED
      });
      console.log('Ошибка, запрос на изменение данных пользователя не выполнен', err);
    });
  };
}

