import type {
  IDetailSummary,
  ISummaryProducts,
} from '../entities/myBankInterfaces';

export const initSummaryProducts: ISummaryProducts = {
  availableBalance: '',
  tradeBalance: '',
  currentBalance: '',
  title: '',
  navigateTo: '',
};

export const initDetailSummary: IDetailSummary = {
  acctNickName: '',
};
