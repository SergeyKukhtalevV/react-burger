import {
  SET_REGISTER_USER_REQUEST,
  SET_REGISTER_USER_SUCCESS,
  SET_REGISTER_USER_FAILED,
  GET_AUTHORIZATION_USER_REQUEST,
  GET_AUTHORIZATION_USER_SUCCESS,
  GET_AUTHORIZATION_USER_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
  GET_LOGOUT_USER_REQUEST,
  GET_LOGOUT_USER_SUCCESS,
  GET_LOGOUT_USER_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SET_USER_INFO_REQUEST,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED,
  GET_USER_NEW_PASSWORD_REQUEST,
  GET_USER_NEW_PASSWORD_SUCCESS,
  GET_USER_NEW_PASSWORD_FAILED,
  SET_USER_NEW_PASSWORD_REQUEST,
  SET_USER_NEW_PASSWORD_SUCCESS,
  SET_USER_NEW_PASSWORD_FAILED,
  GET_USER_NEW_PASSWORD_INIT

} from '../actions/user';
import {deleteCookie, setCookie} from "../../utils/utils";

const initialState = {
  userInfo: {},
  userInfoRequest: false,
  userInfoFailed: false,
  userInfoAnswer: false,
  accessToken: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false
      };
    }
    case SET_REGISTER_USER_SUCCESS: {
      setCookie('token', action.data.refreshToken);
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        userInfo: action.data.user,
        accessToken: action.data.accessToken.split('Bearer ')[1]
      };
    }
    case SET_REGISTER_USER_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_AUTHORIZATION_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoFailed: false,
        userInfoAnswer: false
      };
    }
    case GET_AUTHORIZATION_USER_SUCCESS: {
      setCookie('token', action.data.refreshToken);
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        userInfo: action.data.user,
        accessToken: action.data.accessToken.split('Bearer ')[1]
      };
    }
    case GET_AUTHORIZATION_USER_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_REFRESH_TOKEN_REQUEST: {
      deleteCookie('token');
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      setCookie('token', action.data.refreshToken);
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        accessToken: action.data.accessToken.split('Bearer ')[1]
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_LOGOUT_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true, userInfoAnswer: false
      };
    }
    case GET_LOGOUT_USER_SUCCESS: {
      deleteCookie('token');
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        accessToken: "",
        userInfo: {}
      };
    }
    case GET_LOGOUT_USER_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true, userInfoAnswer: false
      };
    }
    case GET_USER_INFO_SUCCESS: {
      setCookie('token', action.data.refreshToken);
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        userInfo: action.data.user
      };
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case SET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false
      };
    }
    case SET_USER_INFO_SUCCESS: {
      setCookie('token', action.data.refreshToken);
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        userInfo: action.data.user
      };
    }
    case SET_USER_INFO_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_USER_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        userInfoRequest: true, userInfoAnswer: false
      };
    }
    case GET_USER_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true
      };
    }
    case GET_USER_NEW_PASSWORD_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case SET_USER_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        userInfoRequest: true, userInfoAnswer: false
      };
    }
    case SET_USER_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true
      };
    }
    case SET_USER_NEW_PASSWORD_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_USER_NEW_PASSWORD_INIT: {
      deleteCookie('token');
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: false,
        accessToken: "",
        userInfo: {}
      };
    }
    default: {
      return state;
    }
  }
}
