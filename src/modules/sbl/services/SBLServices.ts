import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';

const useSBLServices = () => {
  const initPush = async (
    optionCode: string,
    complement?: string,
  ): Promise<any> => {
    const { data } = await api.post<any>(endPoints.sbl.initPush, {
      optionMenuCode: optionCode,
      transactionConfigComplement: !!complement ? complement : 'DEFAULT',
      userValidation: 'user',
    });
    return data;
  };

  const pushResult = async (): Promise<any> => {
    const { data } = await api.post<any>(endPoints.sbl.pushResult);
    return data;
  };

  const initSoftToken = async (): Promise<any> => {
    const { data } = await api.post<any>(endPoints.sbl.initSoft, {
      userValidation: 'user',
    });
    return data;
  };

  const softTokenAuthorize = async (token: string): Promise<any> => {
    const { data } = await api.post<any>(endPoints.sbl.softAuthorize, {
      challengeData: token,
      userValidation: 'user',
    });
    return data;
  };

  return {
    initPush,
    pushResult,
    initSoftToken,
    softTokenAuthorize,
  };
};

export default useSBLServices;
