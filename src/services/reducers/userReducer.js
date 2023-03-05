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
  SET_LOGOUT_USER_REQUEST,
  SET_LOGOUT_USER_SUCCESS,
  SET_LOGOUT_USER_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SET_USER_INFO_REQUEST,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED

} from '../actions/user';

const initialState = {
  userInfo: {},
  userInfoRequest: false,
  userInfoFailed: false,
  accessToken: '',
  refreshToken: '' //TODO сохранять в куки
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true
      };
    }
    case SET_REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfo: action.data.user,
        accessToken: action.data.accessToken.split('Bearer ')[1],
        refreshToken: action.data.refreshToken
      };
    }
    case SET_REGISTER_USER_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false
      };
    }
    case GET_AUTHORIZATION_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true
      };
    }
    case GET_AUTHORIZATION_USER_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfo: action.data.user,
        accessToken: action.data.accessToken.split('Bearer ')[1],
        refreshToken: action.data.refreshToken
      };
    }
    case GET_AUTHORIZATION_USER_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false
      };
    }
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        userInfoRequest: true
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        accessToken: action.data.accessToken.split('Bearer ')[1],
        refreshToken: action.data.refreshToken
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false
      };
    }
    case SET_LOGOUT_USER_REQUEST: {
      return {
        ...state,
        userInfoRequest: true
      };
    }
    case SET_LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        accessToken: "",
        refreshToken: "",
        userInfo: {}
      };
    }
    case SET_LOGOUT_USER_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false
      };
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfo: action.data.user
      };
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false
      };
    }
    case SET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true
      };
    }
    case SET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: false,
        userInfo: action.data.user
      };
    }
    case SET_USER_INFO_FAILED: {
      return {
        ...state, userInfoFailed: true, userInfoRequest: false
      };
    }
  }
}
