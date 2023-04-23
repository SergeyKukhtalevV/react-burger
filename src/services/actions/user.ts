import {
  getAuthUserRequest, getLogoutUser,
  getTokenRequest,
  getUserInfoRequest, getUserNewPasswordRequest,
  setRegisterUserRequest,
  setUserInfoRequest, setUserNewPasswordRequest, urlLogout, urlToken
} from "../api";
import {
  IGetAuthorizationUserFailedAction,
  IGetAuthorizationUserRequestAction,
  IGetAuthorizationUserSuccessAction,
  IGetLogoutUserFailedAction,
  IGetLogoutUserRequestAction,
  IGetLogoutUserSuccessAction,
  IGetRefreshTokenFailedAction,
  IGetRefreshTokenRequestAction,
  IGetRefreshTokenSuccessAction,
  IGetUserInfoFailedAction,
  IGetUserInfoRequestAction,
  IGetUserInfoSuccessAction,
  IGetUserNewPasswordFailedAction,
  IGetUserNewPasswordRequestAction,
  IGetUserNewPasswordSuccessAction,
  ISetRegisterUserFailedAction,
  ISetRegisterUserRequestAction,
  ISetRegisterUserSuccessAction,
  ISetUserInfoFailedAction,
  ISetUserInfoRequestAction,
  ISetUserInfoSuccessAction,
  ISetUserNewPasswordFailedAction,
  ISetUserNewPasswordRequestAction,
  ISetUserNewPasswordSuccessAction
} from "../types/action-types/userActionsTypes";
import {
  TAuthUser,
  TAuthUserSuccess, TForgotPassUser,
  TGettingInfoUser, TNewPassUser, TNewToken,
  TRegisterUser,
  TResponseAuthUser, TResponseForgotUser,
  TResponseInfoUser, TResponseReFreshUser, TSettingInfoUser
} from "../types/userTypes";
import {AppDispatch, AppThunk} from "../types";

export const SET_REGISTER_USER_REQUEST: 'SET_REGISTER_USER_REQUEST' = 'SET_REGISTER_USER_REQUEST';
export const SET_REGISTER_USER_SUCCESS: 'SET_REGISTER_USER_SUCCESS' = 'SET_REGISTER_USER_SUCCESS';
export const SET_REGISTER_USER_FAILED: 'SET_REGISTER_USER_FAILED' = 'SET_REGISTER_USER_FAILED';

export const GET_AUTHORIZATION_USER_REQUEST: 'GET_AUTHORIZATION_USER_REQUEST' = 'GET_AUTHORIZATION_USER_REQUEST';
export const GET_AUTHORIZATION_USER_SUCCESS: 'GET_AUTHORIZATION_USER_SUCCESS' = 'GET_AUTHORIZATION_USER_SUCCESS';
export const GET_AUTHORIZATION_USER_FAILED: 'GET_AUTHORIZATION_USER_FAILED' = 'GET_AUTHORIZATION_USER_FAILED';

export const GET_REFRESH_TOKEN_REQUEST: 'GET_REFRESH_TOKEN_REQUEST' = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS: 'GET_REFRESH_TOKEN_SUCCESS' = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED: 'GET_REFRESH_TOKEN_FAILED' = 'GET_REFRESH_TOKEN_FAILED';

export const GET_LOGOUT_USER_REQUEST: 'GET_LOGOUT_USER_REQUEST' = 'GET_LOGOUT_USER_REQUEST';
export const GET_LOGOUT_USER_SUCCESS: 'GET_LOGOUT_USER_SUCCESS' = 'GET_LOGOUT_USER_SUCCESS';
export const GET_LOGOUT_USER_FAILED: 'GET_LOGOUT_USER_FAILED' = 'GET_LOGOUT_USER_FAILED';

export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED: 'GET_USER_INFO_FAILED' = 'GET_USER_INFO_FAILED';

export const SET_USER_INFO_REQUEST: 'SET_USER_INFO_REQUEST' = 'SET_USER_INFO_REQUEST';
export const SET_USER_INFO_SUCCESS: 'SET_USER_INFO_SUCCESS' = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAILED: 'SET_USER_INFO_FAILED' = 'SET_USER_INFO_FAILED';

export const GET_USER_NEW_PASSWORD_REQUEST: 'GET_USER_NEW_PASSWORD_REQUEST' = 'GET_USER_NEW_PASSWORD_REQUEST';
export const GET_USER_NEW_PASSWORD_SUCCESS: 'GET_USER_NEW_PASSWORD_SUCCESS' = 'GET_USER_NEW_PASSWORD_SUCCESS';
export const GET_USER_NEW_PASSWORD_FAILED: 'GET_USER_NEW_PASSWORD_FAILED' = 'GET_USER_NEW_PASSWORD_FAILED';
export const GET_USER_NEW_PASSWORD_INIT: 'GET_USER_NEW_PASSWORD_INIT' = 'GET_USER_NEW_PASSWORD_INIT';

export const SET_USER_NEW_PASSWORD_REQUEST: 'SET_USER_NEW_PASSWORD_REQUEST' = 'SET_USER_NEW_PASSWORD_REQUEST';
export const SET_USER_NEW_PASSWORD_SUCCESS: 'SET_USER_NEW_PASSWORD_SUCCESS' = 'SET_USER_NEW_PASSWORD_SUCCESS';
export const SET_USER_NEW_PASSWORD_FAILED: 'SET_USER_NEW_PASSWORD_FAILED' = 'SET_USER_NEW_PASSWORD_FAILED';

export const getAuthorizationUserAction = (): IGetAuthorizationUserRequestAction => ({
  type: GET_AUTHORIZATION_USER_REQUEST
});

export const getAuthorizationUserFailedAction = (): IGetAuthorizationUserFailedAction => ({
  type: GET_AUTHORIZATION_USER_FAILED
});

export const getAuthorizationUserSuccessAction = (data: TResponseAuthUser<TAuthUserSuccess>): IGetAuthorizationUserSuccessAction => ({
  type: GET_AUTHORIZATION_USER_SUCCESS,
  data
});

export const getAuthUser: AppThunk = (info: TAuthUser) => (dispatch: AppDispatch) => {
  dispatch(getAuthorizationUserAction());
  getAuthUserRequest(info)
    .then(res => res.json())
    .then(data => {
      dispatch(getAuthorizationUserSuccessAction({...data}))
    })
    .catch(err => {
      dispatch(getAuthorizationUserFailedAction());
      console.log('Ошибка, запрос на авторизацию пользователя не выполнен', err);
    });
};

export const setRegisterUserAction = (): ISetRegisterUserRequestAction => ({
  type: SET_REGISTER_USER_REQUEST
});

export const setRegisterUserFailedAction = (): ISetRegisterUserFailedAction => ({
  type: SET_REGISTER_USER_FAILED
});

export const setRegisterUserSuccessAction = (data: TResponseAuthUser<TAuthUserSuccess>): ISetRegisterUserSuccessAction => ({
  type: SET_REGISTER_USER_SUCCESS,
  data
});


export const setRegisterUser: AppThunk = (info: TRegisterUser) => (dispatch: AppDispatch) => {
  dispatch(setRegisterUserAction());
  setRegisterUserRequest(info).then(res => {
    dispatch(setRegisterUserSuccessAction(res.data));
  }).catch(err => {
    dispatch(setRegisterUserFailedAction());
    console.log('Ошибка, запрос на регистрацию пользователя не выполнен', err);
  });
};


export const getIngoUserAction = (): IGetUserInfoRequestAction => ({
  type: GET_USER_INFO_REQUEST
});

export const getIngoUserFailedAction = (): IGetUserInfoFailedAction => ({
  type: GET_USER_INFO_FAILED
});

export const getIngoUserSuccessAction = (data: TResponseInfoUser<TAuthUserSuccess>): IGetUserInfoSuccessAction => ({
  type: GET_USER_INFO_SUCCESS,
  data
});

export const getUserInfo: AppThunk = (data: TGettingInfoUser) => (dispatch: AppDispatch) => {
  dispatch(getIngoUserAction());
  getUserInfoRequest(data).then(res => {
    dispatch(getIngoUserSuccessAction(res.data));
  }).catch(err => {
    dispatch(getIngoUserFailedAction());
    console.log('Ошибка, запрос на получения данных пользователя не выполнен', err);
  });
};

export const getUserNewPasswordAction = (): IGetUserNewPasswordRequestAction => ({
  type: GET_USER_NEW_PASSWORD_REQUEST
});

export const getUserNewPasswordFailedAction = (): IGetUserNewPasswordFailedAction => ({
  type: GET_USER_NEW_PASSWORD_FAILED
});

export const getUserNewPasswordSuccessAction = (data: TResponseForgotUser): IGetUserNewPasswordSuccessAction => ({
  type: GET_USER_NEW_PASSWORD_SUCCESS,
  data
});


export const getUserNewPassword: AppThunk = (info: TForgotPassUser) => (dispatch: AppDispatch) => {
  dispatch(getUserNewPasswordAction());
  getUserNewPasswordRequest(info).then(res => {
    dispatch(getUserNewPasswordSuccessAction(res.data));
  }).catch(err => {
    dispatch(getUserNewPasswordFailedAction());
    console.log('Ошибка, запрос на восстановление пользователя не выполнен', err);
  });
};

export const setUserNewPasswordRequestAction = (): ISetUserNewPasswordRequestAction => ({
  type: SET_USER_NEW_PASSWORD_REQUEST
});

export const setUserNewPasswordFailedAction = (): ISetUserNewPasswordFailedAction => ({
  type: SET_USER_NEW_PASSWORD_FAILED
});

export const setUserNewPasswordSuccessAction = (data: TResponseForgotUser): ISetUserNewPasswordSuccessAction => ({
  type: SET_USER_NEW_PASSWORD_SUCCESS,
  data
});

export const setUserNewPassword: AppThunk = (info: TNewPassUser) => (dispatch: AppDispatch) => {
  dispatch(setUserNewPasswordRequestAction());
  setUserNewPasswordRequest(info).then(res => {
    dispatch(setUserNewPasswordSuccessAction(res.data));
  }).catch(err => {
    dispatch(setUserNewPasswordFailedAction());
    console.log('Ошибка, запрос на сохранение нового пароля пользователя не выполнен', err);
  });
};

export const getLogoutUserRequestAction = (): IGetLogoutUserRequestAction => ({
  type: GET_LOGOUT_USER_REQUEST
});

export const getLogoutUserFailedAction = (): IGetLogoutUserFailedAction => ({
  type: GET_LOGOUT_USER_FAILED
});

export const getLogoutUserSuccessAction = (data: TResponseForgotUser): IGetLogoutUserSuccessAction => ({
  type: GET_LOGOUT_USER_SUCCESS,
  data
});


export const getLogOutUser: AppThunk = (info: TNewToken) => (dispatch: AppDispatch) => {
  dispatch(getLogoutUserRequestAction());
  getLogoutUser(urlLogout, info).then(res => {
    dispatch(getLogoutUserSuccessAction(res.data));
  }).catch(err => {
    dispatch(getLogoutUserFailedAction());
    console.log('Ошибка, запрос на выход из системы не выполнен', err);
  });
};

export const getRefreshTokenRequestAction = (): IGetRefreshTokenRequestAction => ({
  type: GET_REFRESH_TOKEN_REQUEST
});

export const getRefreshTokenFailedAction = (): IGetRefreshTokenFailedAction => ({
  type: GET_REFRESH_TOKEN_FAILED
});

export const getRefreshTokenSuccessAction = (data: TResponseReFreshUser): IGetRefreshTokenSuccessAction => ({
  type: GET_REFRESH_TOKEN_SUCCESS,
  data
});


export const getFreshToken: AppThunk = (info: TNewToken) => (dispatch: AppDispatch) => {
  dispatch(getRefreshTokenRequestAction());
  getTokenRequest(urlToken, info).then(res => {
    dispatch(getRefreshTokenSuccessAction(res.data));
  }).catch(err => {
    dispatch(getRefreshTokenFailedAction());
    console.log('Ошибка, запрос на обновление токена не выполнен', err);
  });
};

export const setUserInfoRequestAction = (): ISetUserInfoRequestAction => ({
  type: SET_USER_INFO_REQUEST
});

export const setUserInfoFailedAction = (): ISetUserInfoFailedAction => ({
  type: SET_USER_INFO_FAILED
});

export const setUserInfoSuccessAction = (data: TResponseInfoUser<TAuthUserSuccess>): ISetUserInfoSuccessAction => ({
  type: SET_USER_INFO_SUCCESS,
  data
});

export const setUserInfo: AppThunk = (info: TSettingInfoUser) => (dispatch: AppDispatch) => {
  dispatch(setUserInfoRequestAction());
  setUserInfoRequest(info).then(res => {
    dispatch(setUserInfoSuccessAction(res.data));
  }).catch(err => {
    dispatch(setUserInfoFailedAction());
    console.log('Ошибка, запрос на изменение данных пользователя не выполнен', err);
  });
};

