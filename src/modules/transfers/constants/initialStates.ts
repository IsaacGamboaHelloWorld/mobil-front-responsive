import type {
  IClientFormData,
  INewTemplateFormData,
  INewTransferFormData,
  ITransfer,
  IUser,
} from '../entities/transfersInterfaces';

export const initTransfer: ITransfer = {
  accountID: '',
  acctIdFrom: '',
  acctIdFromMask: '',
  acctIdTo: '',
  acctTypeFrom: '',
  acctTypeFromDesc: '',
  acctTypeTo: '',
  acctTypeToDesc: '',
  exonerateGMF: false,
  financialEntity: '',
  financialEntityCode: '',
  id: '',
  identification: '',
  identificationType: '',
  identificationTypeDesc: '',
  infoAdditional: '',
  payVal: '',
  recipientName: '',
  referenceBillNumber: '',
  txDate: '',
};

export const initUser: IUser = {
  completeName: '',
  id: '',
  identification: '',
  identificationType: '',
  lastName: '',
  name: '',
  profile: '',
  profileId: '',
  secondLastName: '',
  status: '',
  userName: '',
  userType: '',
};

export const initTransferFormData: INewTransferFormData = {
  credential: '',
  transactionList: [initTransfer],
};

export const initClientFormData: IClientFormData = {
  accountID: '',
  acctIdTo: '',
  acctTypeTo: '',
  financialEntityCode: '',
  identification: '',
  identificationType: '',
  recipientName: '',
  searchType: '',
};

export const initNewTemplateFormData: INewTemplateFormData = {
  credential: '',
  templateName: '',
  templateTransactions: [initTransfer],
};
