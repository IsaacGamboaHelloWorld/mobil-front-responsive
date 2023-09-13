import api from '@/commons/globalService/api';

import { endPoints } from '@/commons/constants/endPoints';
import type {
  IBodyRequest,
  ILastTransfersDetailResponse,
  ILastTransfersResponse,
  IParameterResponse,
  IScheduleResponse,
  IScheduleTransfersDetailResponse,
} from '../entities/transfersInterfaces';

const pageSize: number = 10;

const useTransfersServices = () => {
  const getPArameters = async (): Promise<IParameterResponse> => {
    const { data } = await api.get<IParameterResponse>(
      endPoints.transfers.getParameters,
      {},
    );
    return data;
  };
  const getLastTransfers = async (
    body: IBodyRequest,
  ): Promise<ILastTransfersResponse> => {
    const { data } = await api.post<ILastTransfersResponse>(
      endPoints.transfers.lastTransfers,
      { ...body, pageSize: pageSize },
    );
    return data;
  };

  const getScheduleTransfers = async (): Promise<IScheduleResponse> => {
    const { data } = await api.get<IScheduleResponse>(
      endPoints.transfers.sheduleTransfers,
    );
    return data;
  };

  const getScheduleTransfersDetail = async (
    id: string,
  ): Promise<IScheduleTransfersDetailResponse> => {
    const { data } = await api.get<IScheduleTransfersDetailResponse>(
      endPoints.transfers.sheduleTransfersDetail + id,
    );
    return data;
  };

  const getLastTransfersDetail = async (body: {
    id: string;
    date: string;
  }): Promise<ILastTransfersDetailResponse> => {
    const { data } = await api.post<ILastTransfersDetailResponse>(
      endPoints.transfers.lastTransfersDetail + body.id,
      { txDate: body.date },
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
    getLastTransfers,
    exportFile,
    getLastTransfersDetail,
    getPArameters,
    getScheduleTransfers,
    getScheduleTransfersDetail,
  };
};

export default useTransfersServices;
