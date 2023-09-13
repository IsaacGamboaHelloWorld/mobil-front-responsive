import type {
  IPermitions,
  IStatus,
} from '@/commons/entities/global.interfaces';

export interface ILoginResponse {
  status?: string;
  code: string;
  response?: {
    virtualTokenStatus: string;
    encodeImage: string;
  };
  message?: string;
  messageDev?: string;
}

export interface IAuthUserRSAKey {
  status: IStatus;
  response?: {
    hasToken: boolean;
    publicKey: string;
    fullUserName: string;
    tokenType: string;
  };
}

export interface IAuth {
  status: IStatus;
  response?: IPermitions[];
}

export interface IChangePasswordForm {
  confirmpassword: string;
  newpassword: string;
  oldpassword: string;
}

export interface IChangePasswordFormResponse {
  status: IStatus;
  response?: any;
}

export interface IForgotPasswordResponse {
  status: IStatus;
  response?: {
    ApprovalId: string;
    email: string;
  };
}

export interface IParameters {
  status: IStatus;
  response?: {
    activePaste?: string;
    ipAddress: string;
    specialCharacters?: string;
  };
}

export interface IIPConfigForm {
  rangeStart: string;
  rangeEnd: string;
}

export interface ICategory {
  status: IStatus;
  response?: {
    id: string;
    value: string;
  }[];
}

export interface IImageR {
  status: IStatus;
  response?: IImageList[];
}

export interface IImageList {
  active: string;
  category: string;
  deleted: string;
  encodedImageFile: string;
  imageFileName: string;
  imageHash: string;
  name: string;
}
