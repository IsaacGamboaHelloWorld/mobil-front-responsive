import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, ref } from 'vue';

import i18n from '@/locales/i18n';
import STEPS from '../constants/steps';
import type { IDetailRecords } from '../entities/myBankInterfaces';
import useMyBankStore from '../store/useMyBankStore';
import useFormattHelper from '@/commons/helpers/formatMoney';

const getHeaders = computed<string[]>(() => [
  i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.PRODUCT-NAME'),
  i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.AVAILABLE'),
  i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.TRADE'),
  i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.CURRENT'),
]);

const filteredList = ref<any[]>([]);

const filterList = ($event: any) => {
  filteredList.value = $event;
};

const useDetail = () => {
  const myBankStore = useMyBankStore();
  const { addCurrencyDot } = useFormattHelper();
  const { sdadetailSummary, ddadetailSummary, currentStep } =
    storeToRefs(myBankStore);

  onBeforeUnmount(() => {
    currentStep.value = STEPS.stepSummary;
  });

  const getRecords = computed<IDetailRecords[]>(() => {
    if (currentStep.value === STEPS.stepDDADetail)
      return ddadetailSummary.value.map((object) => ({
        acctNickName: object.acctNickName!,
        availableBalance: addCurrencyDot(object.availableBalance!),
        tradeBalance: addCurrencyDot(object.tradeBalance!),
        currentBalance: addCurrencyDot(object.currentBalance!),
        detailFirstCol: [
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.PRODUCT-TYPE',
            ),
            value: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.DETAIL.DDA-TYPE'),
          },
          {
            label: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.PRODUCT-NAME'),
            value: object.acctNickName,
          },
          {
            label: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.DETAIL.ID'),
            value: object.acctId,
          },
          {
            label: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.DETAIL.STATE'),
            value: object.bankAcctStatusCode,
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.YESTERDAY-BALANCE',
            ),
            value: !!object.yesterdayBalance
              ? addCurrencyDot(object.yesterdayBalance)
              : '',
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.REMITTANCES',
            ),
            value: !!object.remittances
              ? addCurrencyDot(object.remittances)
              : '',
          },
        ],
        detailSecondCol: [
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-DAYS',
            ),
            value: object.overDraftDays,
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-APPROVED-QUOTE',
            ),
            value: !!object.overDraftQuotaApproved
              ? addCurrencyDot(object.overDraftQuotaApproved)
              : '',
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-STATUS',
            ),
            value: object.quotaStatusOverdraftAvailable,
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-AVAILABLE-QUOTE',
            ),
            value: !!object.overDraftQuotaAvailable
              ? addCurrencyDot(object.overDraftQuotaAvailable)
              : '',
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.QUOTA-TRADE-APPROVED',
            ),
            value: !!object.tradeQuotaApproved
              ? addCurrencyDot(object.tradeQuotaApproved)
              : '',
          },
          {
            label: i18n.global.t(
              'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.QUOTA-REMITTANCES-APPROVED',
            ),
            value: !!object.remittanceQuotaApproved
              ? addCurrencyDot(object.remittanceQuotaApproved)
              : '',
          },
        ],
      }));
    return sdadetailSummary.value.map((object) => ({
      acctNickName: object.acctNickName!,
      availableBalance: addCurrencyDot(object.availableBalance!),
      tradeBalance: addCurrencyDot(object.tradeBalance!),
      currentBalance: addCurrencyDot(object.currentBalance!),
      detailFirstCol: [
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.PRODUCT-TYPE',
          ),
          value: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.DETAIL.DDA-TYPE'),
        },
        {
          label: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.PRODUCT-NAME'),
          value: object.acctNickName,
        },
        {
          label: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.DETAIL.ID'),
          value: object.acctId,
        },
        {
          label: i18n.global.t('MY-BANK-MODULE.DETAIL.TABLE.DETAIL.STATE'),
          value: object.bankAcctStatusCode,
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.YESTERDAY-BALANCE',
          ),
          value: !!object.yesterdayBalance
            ? addCurrencyDot(object.yesterdayBalance)
            : '',
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.REMITTANCES',
          ),
          value: !!object.remittances ? addCurrencyDot(object.remittances) : '',
        },
      ],
      detailSecondCol: [
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-DAYS',
          ),
          value: object.overDraftDays,
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-APPROVED-QUOTE',
          ),
          value: !!object.overDraftQuotaApproved
            ? addCurrencyDot(object.overDraftQuotaApproved)
            : '',
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-STATUS',
          ),
          value: object.quotaStatusOverdraftAvailable,
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.OVERDRAFT-AVAILABLE-QUOTE',
          ),
          value: !!object.overDraftQuotaAvailable
            ? addCurrencyDot(object.overDraftQuotaAvailable)
            : '',
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.QUOTA-TRADE-APPROVED',
          ),
          value: !!object.tradeQuotaApproved
            ? addCurrencyDot(object.tradeQuotaApproved)
            : '',
        },
        {
          label: i18n.global.t(
            'MY-BANK-MODULE.DETAIL.TABLE.DETAIL.QUOTA-REMITTANCES-APPROVED',
          ),
          value: !!object.remittanceQuotaApproved
            ? addCurrencyDot(object.remittanceQuotaApproved)
            : '',
        },
      ],
    }));
  });

  return { getRecords, getHeaders, filterList, filteredList, currentStep };
};

export default useDetail;
