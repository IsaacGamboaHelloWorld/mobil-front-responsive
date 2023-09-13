import type { IStatus } from '@/commons/entities/global.interfaces';
import type { IProduct, IDetail, IDetailList } from '../entities/bbpInterfaces';

export const initStatus: IStatus = {
  status: '',
  code: '',
  token: '',
  message: '',
};

export const initDetail: IDetail = {
  amt: '',
  balance: '',
  balanceLabel: '',
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

export const initProductDetail: IDetailList = {
  Advances_available_space_weights: initDetail,
  Alternative_minimum_payout_value_weights: initDetail,
  Product_number: initDetail,
  Money_type_desc: initDetail,
  Money_symbol: initDetail,
  Total_payment_USD: initDetail,
  Pay_minimum_value: initDetail,
  Product_type: initDetail,
  Payment_deadline: initDetail,
  Weights_shopping_space_available: initDetail,
  Full_payment_weights: initDetail,
  Current_balance: initDetail,
  Space_available_dollar_advances: initDetail,
  Pay_minimum_dollar_value: initDetail,
  Total_Capacity: initDetail,
  Product_name: initDetail,
  Space_available_to_buy_dollars: initDetail,
  Money_type: initDetail,
  Delinquent_balance_weights: initDetail,
  Product_desc: initDetail,
  Product_state: initDetail,
  Delinquent_balance_dollars: initDetail,
};
