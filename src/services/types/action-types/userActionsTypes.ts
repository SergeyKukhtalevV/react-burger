import {
  GET_AUTHORIZATION_USER_FAILED,
  GET_AUTHORIZATION_USER_REQUEST,
  GET_AUTHORIZATION_USER_SUCCESS,
  GET_LOGOUT_USER_FAILED,
  GET_LOGOUT_USER_REQUEST,
  GET_LOGOUT_USER_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_NEW_PASSWORD_FAILED,
  GET_USER_NEW_PASSWORD_REQUEST,
  GET_USER_NEW_PASSWORD_SUCCESS,
  SET_REGISTER_USER_FAILED,
  SET_REGISTER_USER_REQUEST,
  SET_REGISTER_USER_SUCCESS,
  SET_USER_INFO_FAILED,
  SET_USER_INFO_REQUEST,
  SET_USER_INFO_SUCCESS,
  SET_USER_NEW_PASSWORD_FAILED,
  SET_USER_NEW_PASSWORD_REQUEST,
  SET_USER_NEW_PASSWORD_SUCCESS
} from "../../actions";
import {
  TAuthUserSuccess,
  TResponseAuthUser, TResponseReFreshUser, TResponseForgotUser,
  TResponseInfoUser
} from "../userTypes";

export interface ISetRegisterUserRequestAction {
  readonly type: typeof SET_REGISTER_USER_REQUEST;
}

export interface ISetRegisterUserSuccessAction {
  readonly type: typeof SET_REGISTER_USER_SUCCESS;
  readonly data: TResponseAuthUser<TAuthUserSuccess>;
}

export interface ISetRegisterUserFailedAction {
  readonly type: typeof SET_REGISTER_USER_FAILED;
}

export interface IGetAuthorizationUserRequestAction {
  readonly type: typeof GET_AUTHORIZATION_USER_REQUEST;
}

export interface IGetAuthorizationUserSuccessAction {
  readonly type: typeof GET_AUTHORIZATION_USER_SUCCESS;
  readonly data: TResponseAuthUser<TAuthUserSuccess>;
}

export interface IGetAuthorizationUserFailedAction {
  readonly type: typeof GET_AUTHORIZATION_USER_FAILED;
}

export interface IGetRefreshTokenRequestAction {
  readonly type: typeof GET_REFRESH_TOKEN_REQUEST;
}

export interface IGetRefreshTokenSuccessAction {
  readonly type: typeof GET_REFRESH_TOKEN_SUCCESS;
  readonly data: TResponseReFreshUser;
}

export interface IGetRefreshTokenFailedAction {
  readonly type: typeof GET_REFRESH_TOKEN_FAILED;
}

export interface IGetLogoutUserRequestAction {
  readonly type: typeof GET_LOGOUT_USER_REQUEST;
}

export interface IGetLogoutUserSuccessAction {
  readonly type: typeof GET_LOGOUT_USER_SUCCESS;
  readonly data: TResponseForgotUser;
}

export interface IGetLogoutUserFailedAction {
  readonly type: typeof GET_LOGOUT_USER_FAILED;
}

export interface IGetUserInfoRequestAction {
  readonly type: typeof GET_USER_INFO_REQUEST;
}

export interface IGetUserInfoSuccessAction {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly data: TResponseInfoUser<TAuthUserSuccess>;
}

export interface IGetUserInfoFailedAction {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface ISetUserInfoRequestAction {
  readonly type: typeof SET_USER_INFO_REQUEST;
}

export interface ISetUserInfoSuccessAction {
  readonly type: typeof SET_USER_INFO_SUCCESS;
  readonly data: TResponseInfoUser<TAuthUserSuccess>;
}

export interface ISetUserInfoFailedAction {
  readonly type: typeof SET_USER_INFO_FAILED;
}

export interface IGetUserNewPasswordRequestAction {
  readonly type: typeof GET_USER_NEW_PASSWORD_REQUEST;
}

export interface IGetUserNewPasswordSuccessAction {
  readonly type: typeof GET_USER_NEW_PASSWORD_SUCCESS;
  readonly data: TResponseForgotUser;
}

export interface IGetUserNewPasswordFailedAction {
  readonly type: typeof GET_USER_NEW_PASSWORD_FAILED;
}

export interface ISetUserNewPasswordRequestAction {
  readonly type: typeof SET_USER_NEW_PASSWORD_REQUEST;
}

export interface ISetUserNewPasswordSuccessAction {
  readonly type: typeof SET_USER_NEW_PASSWORD_SUCCESS;
  readonly data: TResponseForgotUser;
}

export interface ISetUserNewPasswordFailedAction {
  readonly type: typeof SET_USER_NEW_PASSWORD_FAILED;
}

export type TUserActions =
  | IGetAuthorizationUserFailedAction
  | IGetAuthorizationUserRequestAction
  | IGetAuthorizationUserSuccessAction
  | IGetLogoutUserFailedAction
  | IGetLogoutUserRequestAction
  | IGetLogoutUserSuccessAction
  | ISetRegisterUserRequestAction
  | ISetRegisterUserFailedAction
  | ISetRegisterUserSuccessAction
  | IGetRefreshTokenRequestAction
  | IGetRefreshTokenFailedAction
  | IGetRefreshTokenSuccessAction
  | IGetUserInfoRequestAction
  | IGetUserInfoFailedAction
  | IGetUserInfoSuccessAction
  | ISetUserInfoRequestAction
  | ISetUserInfoFailedAction
  | ISetUserInfoSuccessAction
  | IGetUserNewPasswordRequestAction
  | IGetUserNewPasswordFailedAction
  | IGetUserNewPasswordSuccessAction
  | ISetUserNewPasswordRequestAction
  | ISetUserNewPasswordFailedAction
  | ISetUserNewPasswordSuccessAction;
