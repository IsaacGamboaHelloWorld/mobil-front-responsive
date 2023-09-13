import type { IStatus } from '@/commons/entities/global.interfaces';
import type {
  IAuth,
  IAuthUserRSAKey,
  ICategory,
  ILoginResponse,
} from '../entities/authInterfaces';

export const initStatus: IStatus = {
  status: '',
  code: '',
  token: '',
  message: '',
};

export const initAuthUserRSAKey: IAuthUserRSAKey = {
  status: initStatus,
  response: {
    hasToken: false,
    publicKey: '',
    fullUserName: '',
    tokenType: '',
  },
};

export const initAuth: IAuth = {
  status: initStatus,
  response: [],
};
export const initLoginResponse: ILoginResponse = {
  status: '',
  code: '',
  response: {
    virtualTokenStatus: '',
    encodeImage: '',
  },
  message: '',
  messageDev: '',
};

export const initCategory: ICategory = {
  status: initStatus,
  response: [{ id: '', value: '' }],
};
