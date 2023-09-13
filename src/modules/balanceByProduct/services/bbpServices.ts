import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';
import { moduleCodes } from '@/commons/constants/responseCodes';
import type { IStatus } from '@/commons/entities/global.interfaces';
import type { IProduct } from '../entities/bbpInterfaces';

export const getProductListData = async (): Promise<{
  status: IStatus;
  response: IProduct[];
}> => {
  const { data } = await api.get<{ status: IStatus; response: IProduct[] }>(
    endPoints.balanceByProducts.getProductData.concat(moduleCodes.bbpCode),
  );
  return data;
};

export const getProductDetailData = async (
  id: string,
): Promise<{ status: IStatus; response: any[] }> => {
  const { data } = await api.get<{ status: IStatus; response: any[] }>(
    endPoints.balanceByProducts.getDetail.concat(id),
  );
  return data;
};

export const exportSummary = async (body: {
  fileTypeExport: string;
  rqUID: string;
}): Promise<IStatus> => {
  const { data } = await api.post<IStatus>(endPoints.balanceByProducts.export, {
    fileTypeExport: body.fileTypeExport,
    rqUID: body.rqUID,
  });
  return data;
};

export const exportDetail = async (body: {
  fileTypeExport: string;
  productType: string;
  rqUID: string;
}): Promise<IStatus> => {
  const { data } = await api.post<IStatus>(
    endPoints.balanceByProducts.exportDetail,
    {
      fileTypeExport: body.fileTypeExport,
      productType: body.productType,
      rqUID: body.rqUID,
    },
  );
  return data;
};
