import {
  getAuthUserRequest,
  getTokenRequest,
  getUserInfoRequest,
  setRegisterUserRequest,
  setUserInfoRequest
} from "../api";

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

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const SET_USER_INFO_REQUEST = 'SET_USER_INFO_REQUEST';
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAILED = 'SET_USER_INFO_FAILED';

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

export function setRegisterUser(info) {
  return function (dispatch) {
    dispatch({
      type: SET_REGISTER_USER_REQUEST
    });
    setRegisterUserRequest(info).then(res => {
      if (res) {
        console.log(res);
        dispatch({
          type: SET_REGISTER_USER_SUCCESS,
          data: res
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

export function getRefreshTokenUser(urlToken, refreshToken) {
  return function (dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST
    });
    getTokenRequest({urlToken, refreshToken}).then(res => {
      if (res) {
        dispatch({
          type: GET_REFRESH_TOKEN_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_REFRESH_TOKEN_FAILED
        });
      }
    }).catch(err => {
      console.log('Ошибка, запрос на обновление токена пользователя не выполнен', err);
    });
  };
}

export function getUserInfo(token) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST
    });
    getUserInfoRequest({token}).then(res => {
      if (res) {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_USER_INFO_FAILED
        });
      }
    }).catch(err => {
      console.log('Ошибка, запрос на получения данных пользователя не выполнен', err);
    });
  };
}

export function setUserInfo(token, name, email, password) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_INFO_REQUEST
    });
    setUserInfoRequest({token, name, email, password}).then(res => {
      if (res) {
        dispatch({
          type: SET_USER_INFO_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: SET_USER_INFO_FAILED
        });
      }
    }).catch(err => {
      console.log('Ошибка, запрос на изменение данных пользователя не выполнен', err);
    });
  };
}
