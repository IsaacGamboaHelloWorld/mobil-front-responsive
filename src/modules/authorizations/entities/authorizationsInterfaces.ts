import type { IStatus } from '@/commons/entities/global.interfaces';

export interface IAuthorization {
  action: string;
  aliasFileName?: string;
  aliasFileType?: string;
  authorizationsType?: string;
  code?: string;
  creator?: string;
  date?: string;
  destinationAccount?: string;
  dynamicCustomValue?: string;
  edited?: string;
  fileId?: string;
  fullName?: string;
  id: string;
  isFile: string;
  isMonetary: string;
  paymentReference?: string;
  recipient?: string;
  service: string;
  serviceAlt: string;
  typeList?: string;
  value?: string;
  webId?: string;
  isActive?: boolean;
  detail?: IAuthorizationDetail;
  transactionAmount: string;
}

export interface IIcbsRoleQuantity {
  roleId: number;
  roleName: string;
  roleQuantity: number;
  roleApproveQuantity: number;
  rolePendingQuantity: number;
}

export interface IIcbsRoleGroupDetail {
  roleGroupId: number;
  groupName: string;
  statusCode: string;
  approvers: number;
  pendingApprovers: number;
  roleQuantity: IIcbsRoleQuantity[];
}

export interface ITransactionFullDetail {
  name: string;
  value: string;
  langText: string;
}

export interface IAuthorizationDetail {
  icbsRoleGroupDetailDTO: IIcbsRoleGroupDetail[];
  transactionFullDetailDTO: ITransactionFullDetail[];
  fullDetailDTOFile: null | any;
  profileClientDTO: null | IProfileClientDTO;
  listAssignedProductsByUserClient: null | IAssignedProduct[];
  userLimitAmountDTO: null | IUserLimitAmountDTO;
}

export interface IUserLimitAmountDTO {
  errorData: any;
  files: any[];
  services: IServices[];
  showView: boolean;
}

export interface IServices {
  serviceId: number;
  serviceName: string;
  products: IProduct[];
}

export interface ILimit {
  limitName: string;
  status: boolean;
  limitAmount: number;
}

export interface IProduct {
  productTypeName: string;
  productNumber: string;
  productNumberEnm: string;
  productNumberEnm2: string;
  productName: string;
  productType: string;
  productId: number;
  limitList: ILimit[];
}

export interface IAssignedProduct {
  productTypeName: string;
  productTypeCode: string;
  clientProduct: ClientProduct[];
  isProductType: boolean;
}

export interface ClientProduct {
  productUserName: string;
  identificationTypeName: string;
  identification: string;
  identificationTypeDescription: string | null;
  productTypeName: string;
  engProductTypeName: string | null;
  productTypeCode: string;
  productNumber: string;
  status: boolean;
  productKey: string;
  stateOwned: boolean;
  productName: string;
}

export interface IProfileClientDTO {
  children: IChildrenProfile[];
  code: string;
  description: string;
  id: number;
  name: string;
  parentId: string;
  status: string;
}
export interface IChildrenProfile {
  code: string;
  description: string;
  name: string;
  status: boolean;
  parentId: number;
  id: number;
  children: IChildrenProfile[];
}
export interface IAuthorizationsResponse {
  response: IAuthorization[];
  status: IStatus;
}

export interface IAuthorizationDetailResponse {
  response?: IAuthorizationDetail;
  status: IStatus;
}

export interface header {
  title: string;
  function: void;
}

export interface IListToAuthorize {
  credential?: string;
  transactions: {
    id: string;
    isFile: string;
    isMonetary: string;
    serviceAction: string;
    serviceName: string;
    serviceNameAlt: string;
  }[];
}

export interface IListToReject {
  credential?: string;
  rejectionMotive?: string;
  transactions: {
    id: string;
    isFile: string;
    isMonetary: string;
    serviceAction: string;
    serviceName: string;
    serviceNameAlt: string;
  }[];
}

export interface IAuthorizedList {
  id: string;
  serviceName: string;
  serviceNameAlt: string;
  transactionDate: string;
  transactionAmount: string;
  creatorUserName: string;
  fullName: string;
  isMonetary: string;
  statusCode: string;
  serviceResquest: string;
  relatedCode: string;
  destinationAccount: string;
  approveRejectDate: string;
  infoMotive: string;
  authCode: string;
  transactionFullDetailDTO: {
    langText: string;
    name: string;
    value: string;
  }[];
}

export interface IAuthorizedListResponse {
  status: IStatus;
  response?: {
    transaction: IAuthorizedList[];
    rqUID: string;
  };
}
