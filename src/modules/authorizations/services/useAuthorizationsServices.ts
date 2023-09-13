import api from '@/commons/globalService/api';
import type {
  IAuthorizationDetailResponse,
  IAuthorizationsResponse,
  IListToAuthorize,
  IListToReject,
} from '../entities/authorizationsInterfaces';
import { endPoints } from '@/commons/constants/endPoints';

const useAuthorizationsServices = () => {
  const getAuthorizations = async (): Promise<IAuthorizationsResponse> => {
    const { data } = await api.get<IAuthorizationsResponse>(
      endPoints.authorizations.getAuthorizations,
      {},
    );
    return data;
  };

  const getAuthorization = async (
    id: string,
  ): Promise<IAuthorizationDetailResponse> => {
    const { data } = await api.post<IAuthorizationDetailResponse>(
      endPoints.authorizations.getAuthorization + id,
      {
        page: 'string',
        sizeList: 'string',
      },
    );
    return data;
  };

  const acceptAuthorizations = async (
    transactions: IListToAuthorize,
  ): Promise<any> => {
    const { data } = await api.post<any>(
      endPoints.authorizations.accept,
      transactions,
    );
    return data;
  };

  const rejectAuthorizations = async (
    transactions: IListToReject,
  ): Promise<any> => {
    const { data } = await api.post<any>(
      endPoints.authorizations.reject,
      transactions,
    );
    return data;
  };

  const exportFile = async (body: {
    type: string;
    rqUID: string;
    isReject: boolean;
  }): Promise<string> => {
    const endPoint = body.isReject
      ? endPoints.authorizations.rejectExport
      : endPoints.authorizations.acceptExport;
    const { data } = await api.post<string>(endPoint, {
      fileTypeExport: body.type,
      rqUID: body.rqUID,
    });

    return data;
  };

  return {
    getAuthorization,
    getAuthorizations,
    acceptAuthorizations,
    rejectAuthorizations,
    exportFile,
  };
};

export default useAuthorizationsServices;
