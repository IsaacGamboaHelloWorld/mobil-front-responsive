import type { IStatus } from '@/commons/entities/global.interfaces';

export interface IHomeData {
  status?: IStatus;
  response?: {
    maxLoginWithoutSA: number;
    activateVerifyAccountMsg: boolean;
    activateProcessWidget: boolean;
    activateCobroWse: boolean;
    allowUseApiAntipishing: boolean;
    activateClientCobroWse: boolean;
    urlCobroWse: string;
    pendingTransactions: IPendingTransactions;
    notificationList: INotificationList[];
    listServicesDemo: string[];
    loginDate: string;
    loginHour: string;
    userIp: string;
    encodedImageFile: string;
    companyName: string;
    internalBankCode: string;
    firstName: string;
    lastName: string;
    secondLastName: string;
    identificationType: string;
    userType: string;
    identification: string;
    identificationTypeName: string;
    icbsBankCode: string;
  };
}

export interface IPendingTransactions {
  noMonetaryTx: number;
  monetaryTx: number;
}

export interface INotificationList {
  amountConfig: boolean;
  createDate: string;
  notificationType: string;
  params: [
    {
      fieldName: string;
      fieldValue: string;
    },
  ];
}

export interface IServiceItem {
  name?: string;
  text?: string;
  icon?: string;
  code?: string;
  navigateTo?: string;
  isActive?: boolean;
  childs?: IServiceItem[];
  showChilds?: boolean;
}

export interface ILogo {
  name: string;
  icon: string;
}
