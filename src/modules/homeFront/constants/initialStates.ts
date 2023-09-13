import type { IStatus } from '@/commons/entities/global.interfaces';
import type {
  IHomeData,
  INotificationList,
  IPendingTransactions,
} from '../entities/homeFrontInterfaces';

export const initStatus: IStatus = {
  status: '',
  code: '',
  token: '',
  message: '',
};

export const initPendingTransactions: IPendingTransactions = {
  noMonetaryTx: 0,
  monetaryTx: 0,
};

export const initNotificationList: INotificationList = {
  amountConfig: false,
  createDate: '',
  notificationType: '',
  params: [
    {
      fieldName: '',
      fieldValue: '',
    },
  ],
};

export const initHomeData: IHomeData = {
  status: initStatus,
  response: {
    maxLoginWithoutSA: 0,
    activateVerifyAccountMsg: false,
    activateProcessWidget: false,
    activateCobroWse: false,
    allowUseApiAntipishing: false,
    activateClientCobroWse: false,
    urlCobroWse: '',
    pendingTransactions: initPendingTransactions,
    notificationList: [initNotificationList],
    listServicesDemo: [''],
    loginDate: '',
    loginHour: '',
    userIp: '',
    encodedImageFile: '',
    companyName: '',
    internalBankCode: '',
    firstName: '',
    lastName: '',
    secondLastName: '',
    identificationType: '',
    userType: '',
    identification: '',
    identificationTypeName: '',
    icbsBankCode: '',
  },
};
