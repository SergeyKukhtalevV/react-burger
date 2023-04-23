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

// export type TReFreshToken = TGettingInfoUser &
//   {
//     refreshToken: string;
//     success: boolean;
//   };

export type TAuthUserSuccess = {
  email: string;
  name: string;
}


export type TResponseAuthUser<T> = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: T;
}
export type TResponseInfoUser<T> = {
  success: boolean;
  user: T;
}
export type TResponseForgotUser = {
  success: boolean;
  message: string;
}

export type TResponseReFreshUser = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
