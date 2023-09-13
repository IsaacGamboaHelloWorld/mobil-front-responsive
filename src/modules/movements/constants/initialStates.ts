import type { IProduct, IStatus } from '@/commons/entities/global.interfaces';
import type {
  ICalendarParameters,
  IMovementTypes,
} from '../entities/movementsInterfaces';

export const initStatus: IStatus = {
  status: '',
  code: '',
  token: '',
  message: '',
};

export const initProduct: IProduct = {
  id: '',
  recordId: '',
  acctDesc: '',
  engAcctDesc: '',
  acctID: '',
  acctIDMasked: '',
  acctType: '',
  curCode: '',
  acctNickName: '',
  isActivated: '',
};

export const initCalendarParameters: ICalendarParameters = {
  value: '',
  startDate: '',
  endDate: '',
  period: '',
  monthPeriod: '',
  time: '',
  today: '',
  yesterday: '',
  lastWeek: '',
  tomorrow: '',
  firstFayLastMonth: '',
  endDayLastMonth: '',
};

export const initMovementTypes: IMovementTypes = {
  code: '',
  name: '',
  acctTypeRestriction: '',
  acctDescRestriction: '',
};
