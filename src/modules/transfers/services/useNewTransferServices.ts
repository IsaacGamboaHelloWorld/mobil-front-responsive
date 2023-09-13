import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';
import type {
  IClientFormData,
  IClientResponse,
  IExportFormData,
  INewTransferFormData,
  INewTransferResponse,
  IParametersResponse,
} from '../entities/transfersInterfaces';

const useNewTransferServices = () => {
  const getClientData = async (
    formData: IClientFormData,
  ): Promise<IClientResponse> => {
    const { data } = await api.post<IClientResponse>(
      endPoints.transfers.getAccountDestiny,
      formData,
    );
    return data;
  };

  const executeNewTransfer = async (
    formData: INewTransferFormData,
  ): Promise<INewTransferResponse> => {
    const { data } = await api.post<INewTransferResponse>(
      endPoints.transfers.addFundTransfer,
      formData,
    );
    return data;
  };

  const getParameters = async (): Promise<IParametersResponse> => {
    const { data } = await api.get<IParametersResponse>(
      endPoints.transfers.getNTParameters,
    );
    return data;
  };

  const exportTransferResume = async (
    formData: IExportFormData,
  ): Promise<any> => {
    const { data } = await api.post<any>(endPoints.transfers.export, formData);
    return data;
  };

  return {
    getClientData,
    executeNewTransfer,
    getParameters,
    exportTransferResume,
  };
};

export default useNewTransferServices;
