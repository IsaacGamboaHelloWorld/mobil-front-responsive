import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';
import type {
  IMovementResponse,
  IMovementsParametersResponse,
  IRequestFileResponse,
  ISearchForm,
} from '../entities/movementsInterfaces';

export const useMovementServices = () => {
  const getMovementsParameters = async (
    type: string,
  ): Promise<IMovementsParametersResponse> => {
    const { data } = await api.get<IMovementsParametersResponse>(
      `${endPoints.movements.getParameters}${type}`,
    );
    return data;
  };

  const sendMovementsForm = async (
    form: ISearchForm,
  ): Promise<IMovementResponse> => {
    const { data } = await api.post<IMovementResponse>(
      `${endPoints.movements.priorDaysMovements}`,
      form,
    );
    return data;
  };

  const requestFile = async (
    form: ISearchForm,
  ): Promise<IRequestFileResponse> => {
    const { data } = await api.post<IRequestFileResponse>(
      `${endPoints.movements.requestFIle}`,
      { ...form, fileType: 'XLS' },
    );
    return data;
  };

  const exportFile = async (body: {
    type: string;
    rqUID: string;
  }): Promise<string> => {
    const { data } = await api.post<string>(endPoints.myBank.exportSummary, {
      fileTypeExport: body.type,
      rqUID: body.rqUID,
    });

    return data;
  };

  return { getMovementsParameters, sendMovementsForm, requestFile, exportFile };
};
export default useMovementServices;
