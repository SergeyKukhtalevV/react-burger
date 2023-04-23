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
  SET_USER_NEW_PASSWORD_FAILED

} from '../actions/user';
import {deleteCookie, setCookie} from "../../utils/utils";
import {TAuthUserSuccess, TUserStateUser} from "../types/userTypes";
import {TUserActions} from "../types/action-types/userActionsTypes";

const initialStateUser: TUserStateUser<TAuthUserSuccess> = {
  userInfo: {} as TAuthUserSuccess,
  userInfoRequest: false,
  userInfoFailed: false,
  userInfoAnswer: false,
  setNewPassword: false,
  accessToken: '',
  isUserAuth: false
}

export const userReducer = (state = initialStateUser, action: TUserActions): TUserStateUser<TAuthUserSuccess> => {
  switch (action.type) {
    case SET_REGISTER_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false,
        isUserAuth: false
      };
    }
    case SET_REGISTER_USER_SUCCESS: {
      setCookie('token', action.data.refreshToken, {path: '/'});
      setCookie('accessToken', action.data.accessToken.split('Bearer ')[1], {path: '/'});
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        isUserAuth: true,
        userInfo: action.data.user,
        accessToken: action.data.accessToken.split('Bearer ')[1]
      };
    }
    case SET_REGISTER_USER_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false,
        isUserAuth: false
      };
    }
    case GET_AUTHORIZATION_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoFailed: false,
        userInfoAnswer: false,
        isUserAuth: false
      };
    }
    case GET_AUTHORIZATION_USER_SUCCESS: {
      setCookie('token', action.data.refreshToken, {path: '/'});
      setCookie('accessToken', action.data.accessToken.split('Bearer ')[1], {path: '/'});
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        isUserAuth: true,
        userInfo: action.data.user,
        accessToken: action.data.accessToken.split('Bearer ')[1]
      };
    }
    case GET_AUTHORIZATION_USER_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false,
        isUserAuth: false
      };
    }
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      setCookie('token', action.data.refreshToken, {path: '/'});
      setCookie('accessToken', action.data.accessToken.split('Bearer ')[1], {path: '/'});
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        accessToken: action.data.accessToken.split('Bearer ')[1]
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      deleteCookie('token');
      deleteCookie('accessToken');
      return {
        ...state, userInfoFailed: true, userInfoRequest: false, userInfoAnswer: false
      };
    }
    case GET_LOGOUT_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false,
        isUserAuth: true
      };
    }
    case GET_LOGOUT_USER_SUCCESS: {
      deleteCookie('token');
      deleteCookie('accessToken');
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        accessToken: "",
        userInfo: {} as TAuthUserSuccess,
        isUserAuth: false,
        setNewPassword: false
      };
    }
    case GET_LOGOUT_USER_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false,
        isUserAuth: true
      };
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false,
        isUserAuth: true
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        isUserAuth: true,
        userInfo: action.data.user
      };
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false
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
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false
      };
    }
    case GET_USER_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false,
        setNewPassword: false
      };
    }
    case GET_USER_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        setNewPassword: true
      };
    }
    case GET_USER_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false,
        setNewPassword: false
      };
    }
    case SET_USER_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoAnswer: false
      };
    }
    case SET_USER_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfoAnswer: true,
        setNewPassword: false
      };
    }
    case SET_USER_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userInfoAnswer: false,
        setNewPassword: true
      };
    }

    default: {
      return state;
    }
  }
}
