import { endPoints } from '@/commons/constants/endPoints';
import type { IProductsResponse } from '@/commons/entities/global.interfaces';
import api from '@/commons/globalService/api';

const getProducts = async (code: string): Promise<IProductsResponse> => {
  const { data } = await api.get<IProductsResponse>(
    `${endPoints.globalServices.acounts}${code}`,
  );
  return data;
};

export default getProducts;
