export interface IStatus {
  status: string;
  code?: string;
  token?: string;
  message?: string;
  messageDev?: string;
}

export interface IProduct {
  id: string;
  recordId: string;
  acctDesc: string;
  engAcctDesc: string;
  acctID: string;
  acctIDMasked: string;
  acctType: string;
  curCode: string;
  acctNickName: string;
  isActivated: string;
}

export interface IProductsResponse {
  status: IStatus;
  response: IProduct[];
}

export interface IPermitions {
  authority?: string;
  accountOrig?: string;
  tokenRequired?: boolean;
  id?: string;
  code?: string;
  description?: string;
  descriptionALt?: string;
  name?: string;
  nameAlt?: string;
  parentCode?: string;
  levelOption?: string;
  optParentId?: null | string;
  hasAutentication?: string;
  isAutorizable?: string;
  hasProductDestination?: string;
  hasProductOrigin?: string;
  status?: string;
  isPasswordConfirm?: string;
  isTokenConfirm?: string;
  childs?: IPermitions[];
}
