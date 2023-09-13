import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';
import apiBeforeToken from '@/commons/globalService/apiBeforeToken';
import type {
  IAuth,
  IAuthUserRSAKey,
  ICategory,
  IChangePasswordForm,
  IChangePasswordFormResponse,
  IImageR,
  IIPConfigForm,
  IForgotPasswordResponse,
  ILoginResponse,
  IParameters,
} from '../entities/authInterfaces';
import {
  apiGetIp,
  apiGetIpSecondMethod,
} from '@/commons/globalService/apiGetIp';

const useAuthServices = () => {
  const initialParameters = async (): Promise<IParameters> => {
    const { data } = await apiBeforeToken.get<IParameters>(
      endPoints.auth.parameters,
    );

    return data;
  };

  const getCredentials = async (): Promise<any> => {
    const { data } = await api.get<any>(endPoints.auth.credentials, {});

    return data;
  };

  const changeLanguage = async (): Promise<any> => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Language':
          localStorage.getItem('lang') === 'es' ? 'es_CO' : 'en_US',
      },
    };

    const { data } = await apiBeforeToken.put<any>(
      endPoints.auth.changeLanguage,
      {},
      config,
    );

    return data;
  };
  const sendToken = async (dataForm: {
    icbsUser: string;
    token: string;
  }): Promise<ILoginResponse> => {
    const config = {
      headers: {
        'X-Device-Print': localStorage.getItem('DevicePrint'),
        'X-Forwarded-For': localStorage.getItem('ip'),
        'Content-Language':
          localStorage.getItem('lang') === 'en' ? 'en_US' : 'es_CO',
      },
    };
    const params = new URLSearchParams();
    params.append('username', dataForm.icbsUser);
    params.append('password', dataForm.token);
    const { data, headers } = await apiBeforeToken.post<ILoginResponse>(
      endPoints.auth.sendLogin,
      params,
      config,
    );
    localStorage.setItem('token', headers['x-auth-token']!);

    return data;
  };

  const changePassword = async (
    dataForm: IChangePasswordForm,
  ): Promise<IChangePasswordFormResponse> => {
    const { data } = await api.post<IChangePasswordFormResponse>(
      endPoints.auth.changePassword,
      dataForm,
    );

    return data;
  };

  const forgotPassword = async (): Promise<IForgotPasswordResponse> => {
    const { data } = await api.post<IForgotPasswordResponse>(
      endPoints.auth.sendPass,
    );

    return data;
  };
  const sendPassword = async (dataForm: {
    icbsUser: string;
    password: string;
  }): Promise<IAuth> => {
    const { data } = await api.post<IAuth>(endPoints.auth.sendAuth, {
      username: dataForm.icbsUser,
      password: dataForm.password,
    });

    return data;
  };

  const sendUser = async (icbsUser: string): Promise<IAuthUserRSAKey> => {
    const config = {
      headers: {
        'Content-Language':
          localStorage.getItem('lang') === 'en' ? 'en_US' : 'es_CO',
      },
    };
    const { data } = await apiBeforeToken.post<IAuthUserRSAKey>(
      endPoints.auth.sendUserRSAKey,
      {
        username: icbsUser,
      },
      config,
    );

    return data;
  };

  const getIp = async (): Promise<string> => {
    const { data } = await apiGetIp.get<string>('', {});
    return data;
  };

  const getIpSecondMethod = async (): Promise<string> => {
    const { data } = await apiGetIpSecondMethod.get<string>('', {});
    return data;
  };

  const getCategories = async (): Promise<ICategory> => {
    const data: ICategory = (await api.get(endPoints.auth.getCategories)).data;
    return data;
  };

  const getImages = async (id: string): Promise<IImageR> => {
    const data: IImageR = (await api.get(`${endPoints.auth.getImages}${id}`))
      .data;
    return data;
  };

  const changeImage = async (
    name: string,
  ): Promise<IChangePasswordFormResponse> => {
    const data: IChangePasswordFormResponse = await api.post(
      endPoints.auth.changeImage,
      {
        imageName: name,
      },
    );
    return data;
  };

  const setIP = async (datos: {
    formData: IIPConfigForm;
    icbsUser: string;
  }): Promise<IChangePasswordFormResponse> => {
    const { data } = await api.post<IChangePasswordFormResponse>(
      endPoints.auth.setIP,
      {
        rangeEnd: datos.formData.rangeEnd,
        rangeStart: datos.formData.rangeStart,
        userName: datos.icbsUser,
      },
    );
    return data;
  };

  return {
    sendPassword,
    forgotPassword,
    initialParameters,
    sendToken,
    changePassword,
    sendUser,
    getIp,
    getCategories,
    getImages,
    changeImage,
    setIP,
    changeLanguage,
    getCredentials,
    getIpSecondMethod,
  };
};
export default useAuthServices;
