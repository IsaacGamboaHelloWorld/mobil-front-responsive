import type { IStatus } from '@/commons/entities/global.interfaces';

export interface IResponse {
  status: IStatus;
  response?: {
    rqUID: string;
  };
}

export interface ITemplate {
  id: number;
  name: string;
  modifyDate: string;
}

export interface ITemplateListResponse {
  status: IStatus;
  response?: { templateList: ITemplate[] };
}

export interface INewTemplateFormData {
  credential: string;
  templateName: string;
  templateTransactions: ITransfer[];
}

export interface IShareTemplateFormData {
  templateIdList: string[];
  userIdList: string[];
}

export interface IUser {
  completeName: string;
  id: string;
  identification: string;
  identificationType: string;
  lastName: string;
  name: string;
  profile: string;
  profileId: string;
  secondLastName: string;
  status: string;
  userName: string;
  userType: string;
}

export interface IUserListResponse {
  status: IStatus;
  response?: {
    userList: IUser[];
  };
}

export interface ITemplateDetail {
  status: IStatus;
  response?: {
    templateTransactions: ITransfer[];
  };
}

export interface INewTransferFormData {
  credential: string;
  transactionList: ITransfer[];
}
export interface ILastTransaction {
  accountID: string;
  acctIdFrom: string;
  acctIdFromMask: string;
  acctIdTo: string;
  acctTypeFrom: string;
  acctTypeFromDesc: string;
  acctTypeTo: string;
  acctTypeToDesc: string;
  approveRejectUser: string;
  authorizationNumber: string;
  city: string;
  companyType: string;
  creatorUser: string;
  dueDate: string;
  emisionDate: string;
  errorCode: string;
  errorDesc: string;
  exonerateGMF: string;
  expDate: string;
  financialEntity: string;
  financialEntityCode: string;
  id: string;
  identification: string;
  identificationType: string;
  identificationTypeDesc: string;
  infoAdditional: string;
  payVal: number;
  recipientName: string;
  referenceBillNumber: string;
  serviceCompany: string;
  serviceId: string;
  serviceName: string;
  state: string;
  txDate: string;
  detail?: ILastTransaction;
}

export interface IScheduledTransfers {
  id: string;
  accountID: string;
  acctIdFrom: string;
  acctIdFromMask: string;
  acctTypeFrom: string;
  acctTypeFromDesc: string;
  txDate: string;
  recipientName: string;
  identificationType: string;
  identificationTypeDesc: string;
  identification: string;
  payVal: number;
  financialEntityCode: string;
  financialEntity: string;
  acctTypeTo: string;
  acctTypeToDesc: string;
  acctIdTo: string;
  referenceBillNumber: string;
  infoAdditional: string;
  exonerateGMF: string;
  detail?: ILastTransaction;
}

export interface IScheduleResponse {
  status: IStatus;
  response: {
    scheduledTransactions: IScheduledTransfers[];
  };
}

export interface ILastTransfersResponse {
  response?: {
    count: number;
    lastTransactions: ILastTransaction[];
  };
  status: IStatus;
}
export interface ILastTransfersDetailResponse {
  response?: {
    transaction: ILastTransaction;
  };
  status: IStatus;
}

export interface IScheduleTransfersDetailResponse {
  response?: {
    transaction: ILastTransaction;
  };
  status: IStatus;
}

export interface ITransferFilter {
  columnName?: string;
  operand?: string;
  operator?: string;
}

export interface IBodyRequest {
  filters: ITransferFilter[];
  pageNumber: number;
  pageSize?: number;
}

export interface ITransfer {
  accountID: string;
  acctIdFrom: string;
  acctIdFromMask: string;
  acctIdTo: string;
  acctTypeFrom: string;
  acctTypeFromDesc: string;
  acctTypeTo: string;
  acctTypeToDesc: string;
  exonerateGMF: boolean;
  financialEntity: string;
  financialEntityCode: string;
  id: string;
  identification: string;
  identificationType: string;
  identificationTypeDesc: string;
  infoAdditional: string;
  payVal: string;
  recipientName: string;
  referenceBillNumber: string;
  txDate: string;
}

export interface IClientFormData {
  accountID: string;
  acctIdTo: string;
  acctTypeTo: string;
  financialEntityCode: string;
  identification: string;
  identificationType: string;
  recipientName: string;
  searchType: string;
}

export interface ITransferResult {
  code: string;
  message: string;
  messageDev: string;
  rqUID: string;
  authorizationNumber: string;
  emisionDate: string;
}

export interface INewTransferResponse {
  response: {
    executeTransactionResultList: ITransferResult[];
  };
  status: IStatus;
}

export interface IClient {
  acctIdTo: string;
  acctTypeTo: string;
  createdDt?: string;
  financialEntityCode: string;
  identification: string;
  identificationType: string;
  recipientName: string;
}

export interface IClientResponse {
  response: {
    accountsAssociation: IClient[];
    remainRec: false;
  };
  status: IStatus;
}

export interface IParametersResponse {
  status: IStatus;
  response?: {
    destinySearchEnabled?: boolean;
    entityAvalList?: IBankItem[];
    entityDestinyList?: IBankItem[];
    identificationTypeList?: IIDTypeItem[];
    onboardingInfo?: {
      id: number;
      name: string;
      nodes: [
        {
          engMessage: string;
          id: number;
          message: string;
          nextStep: string;
          step: string;
          type: string;
        },
      ];
      serviceName: string;
      status: false;
      userViews: number;
      views: number;
    };
    productDestinyTypeList?: IProductTypeItem[];
  };
}

export interface IBankItem {
  entityCode: string;
  entityDesc: string;
}

export interface IIDTypeItem {
  idCode: string;
  idDesc: string;
}

export interface IProductTypeItem {
  typeCode: string;
  typeDesc: string;
}

export interface IProductItem {
  id: string;
  name: string;
}

export interface IExportFormData {
  isMultiTx: boolean;
  rqUID: string;
  statusCode: string;
}

export interface IOnboardingInfo {
  id: number;
  name: string;
  nodes: any[];
  serviceName: string;
  status: boolean;
  userViews: number;
  views: number;
}

export interface IParameterResponse {
  response: {
    maxDays: number;
    onboardingInfo?: IOnboardingInfo;
  };
  status: IStatus;
}
