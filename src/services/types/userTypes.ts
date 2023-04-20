export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
}

export type TAuthUser = {
  email: string;
  password: string;
}

export type TForgotPassUser = {
  email: string;
}

export type TNewPassUser = {
  password: string;
  token: string;
}

export type TGettingInfoUser = {
  accessToken: string;
}

export type TSettingInfoUser = TGettingInfoUser & TRegisterUser;

export type TNewToken = {
  token: string;
}