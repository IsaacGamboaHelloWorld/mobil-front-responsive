import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/api';
import type { IHomeData } from '../entities/homeFrontInterfaces';

export const loadHomeFrontData = async (): Promise<IHomeData> => {
  const { data } = await api.get<IHomeData>(endPoints.homeFront.getHomeData);
  return data;
};
