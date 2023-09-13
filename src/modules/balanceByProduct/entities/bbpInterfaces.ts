export interface IDetail {
  amt: string;
  balance: string;
  balanceLabel: string;
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
  error?: null | {
    code: string;
    message: string;
    messageDev: string;
  };
}

export interface IProductItem {
  name: string;
  number: string;
}

export interface IDetailList {
  Advances_available_space_weights?: IDetail;
  Available_balance?: IDetail;
  Alternative_minimum_payout_value_weights?: IDetail;
  Product_number?: IDetail;
  Money_type_desc?: IDetail;
  Money_symbol?: IDetail;
  Total_payment_USD?: IDetail;
  Pay_minimum_value?: IDetail;
  Product_type?: IDetail;
  Payment_deadline?: IDetail;
  Weights_shopping_space_available?: IDetail;
  Full_payment_weights?: IDetail;
  Current_balance?: IDetail;
  Space_available_dollar_advances?: IDetail;
  Pay_minimum_dollar_value?: IDetail;
  Total_Capacity?: IDetail;
  Product_name?: IDetail;
  Space_available_to_buy_dollars?: IDetail;
  Money_type?: IDetail;
  Delinquent_balance_weights?: IDetail;
  Product_desc?: IDetail;
  Product_state?: IDetail;
  Delinquent_balance_dollars?: IDetail;
  OverDraftDays?: IDetail;
  Valor_contrato?: IDetail;
  LiquidationMethod?: IDetail;
  Extensions?: IDetail;
  OpenDt?: IDetail;
  DueDt?: IDetail;
  Spread?: IDetail;
  Valor_capital?: IDetail;
  Saldo_obligacion?: IDetail;
  PaymentForm?: IDetail;
  Valor_opcion_compra?: IDetail;
  Valor_canon?: IDetail;
  porcentaje_opcion_compra?: IDetail;
  Tasa_fija?: IDetail;
  Nombre_Cliente?: IDetail;
  Quota_approved?: IDetail;
}

export interface IDetail {
  amt: string;
  balanceLabel: string;
}

export interface IDetailRecords {
  productName: string;
  productNumber: string;
  thirdCol?: string;
  detailFirstCol?: Icolumn[];
  detailSecondCol?: Icolumn[];
}

export interface Icolumn {
  label: string;
  value: string | undefined;
}
