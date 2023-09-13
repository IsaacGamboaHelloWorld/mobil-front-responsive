import api from '@/commons/globalService/api';
import { endPoints } from '@/commons/constants/endPoints';
import type {
  IResponse,
  IUserListResponse,
  IShareTemplateFormData,
  ITemplateListResponse,
  INewTemplateFormData,
  IParametersResponse,
  ITemplateDetail,
} from '../entities/transfersInterfaces';

const useTemplateServices = () => {
  const getTemplateList = async (): Promise<ITemplateListResponse> => {
    const { data } = await api.get<ITemplateListResponse>(
      endPoints.transfers.listTemplate,
    );
    return data;
  };

  const createTemplate = async (
    formData: INewTemplateFormData,
  ): Promise<IResponse> => {
    const { data } = await api.post<IResponse>(
      endPoints.transfers.listTemplate,
      formData,
    );
    return data;
  };

  const getParameters = async (): Promise<IParametersResponse> => {
    const { data } = await api.get<IParametersResponse>(
      endPoints.transfers.getTemplateParameters,
    );
    return data;
  };

  const shareTemplate = async (
    formData: IShareTemplateFormData,
  ): Promise<IResponse> => {
    const { data } = await api.post<IResponse>(
      endPoints.transfers.shareTemplate,
      formData,
    );
    return data;
  };

  const getUserList = async (): Promise<IUserListResponse> => {
    const { data } = await api.get<IUserListResponse>(
      endPoints.transfers.searchUsers,
    );
    return data;
  };

  const deleteTemplate = async (formData: {
    id: number;
    auth: string;
  }): Promise<IResponse> => {
    localStorage.setItem('Authorization', formData.auth);
    const { data } = await api.delete<IResponse>(
      endPoints.transfers.templateDetail + formData.id,
    );
    return data;
  };

  const getTemplateDetail = async (id: number): Promise<ITemplateDetail> => {
    const { data } = await api.get<ITemplateDetail>(
      endPoints.transfers.templateDetail + id,
    );
    return data;
  };

  const updateTemplate = async (form: {
    id: number;
    formData: INewTemplateFormData;
  }): Promise<IResponse> => {
    const { data } = await api.put<IResponse>(
      endPoints.transfers.templateDetail + form.id,
      form.formData,
    );
    return data;
  };

  return {
    getTemplateList,
    createTemplate,
    getParameters,
    shareTemplate,
    getUserList,
    deleteTemplate,
    getTemplateDetail,
    updateTemplate,
  };
};

export default useTemplateServices;
