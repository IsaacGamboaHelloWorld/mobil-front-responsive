import type { IStatus } from '@/commons/entities/global.interfaces';

export interface ISummaryProducts {
  availableBalance: string;
  tradeBalance: string;
  currentBalance: string;
  title?: string;
  navigateTo?: string;
}

export interface IDetailSummary {
  productType?: string;
  acctNickName?: string;
  acctId?: string;
  bankAcctStatusCode?: string;
  overDraftDays?: string;
  quotaStatusOverdraftAvailable?: string;
  yesterdayBalance?: string;
  availableBalance?: string;
  blockedBalance?: string;
  totalAvailable?: string;
  tradeBalance?: string;
  tradeBalance24?: string;
  tradeBalance48?: string;
  tradeBalance72?: string;
  remittances?: string;
  currentBalance?: string;
  overDraftQuotaApproved?: string;
  overDraftQuotaAvailable?: string;
  tradeQuotaApproved?: string;
  remittanceQuotaApproved?: string;
  tradeOverdraftAvailable?: string;
}

export interface ISummaryResponse {
  status?: IStatus;
  response?: {
    totalSummary: ISummaryProducts;
    sdasummaryBalance: ISummaryProducts;
    ddasummaryBalance: ISummaryProducts;
    ddadetailSummary?: IDetailSummary[];
    sdadetailSummary?: IDetailSummary[];
    rqUID: string;
  };
}

export interface IDetailRecords {
  acctNickName: string;
  availableBalance: string;
  tradeBalance: string;
  currentBalance: string;
  detailFirstCol?: { label: string; value: string | undefined }[];
  detailSecondCol?: { label: string; value: string | undefined }[];
}
