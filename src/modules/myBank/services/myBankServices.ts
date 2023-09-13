import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';
import type { ISummaryResponse } from '../entities/myBankInterfaces';

//mock de servicio
// import { getSummaryDattitleaMock } from '@/commons/mocks/miBankMock';

export const getMyBankData = async (): Promise<ISummaryResponse> => {
  const { data } = await api.get<ISummaryResponse>(
    endPoints.myBank.getSummaryData,
  );
  return data;
};

export const requestExportSummary = async (body: {
  type: string;
  rqUID: string;
}): Promise<string> => {
  const { data } = await api.post<string>(endPoints.myBank.exportSummary, {
    fileTypeExport: body.type,
    rqUID: body.rqUID,
  });

  return data;
};
export const requestExportSummaryDetail = async (body: {
  type: string;
  rqUID: string;
  productType: string;
}): Promise<string> => {
  const { data } = await api.post<string>(
    endPoints.myBank.exportSummaryDetail,
    {
      fileTypeExport: body.type,
      productType: body.productType,
      rqUID: body.rqUID,
    },
  );

  return data;
};
