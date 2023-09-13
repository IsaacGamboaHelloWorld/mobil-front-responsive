import { storeToRefs } from 'pinia';
import { computed, onUnmounted, ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import i18n from '@/locales/i18n';
import { useBbpStore } from '../store/useBbpStore';
import PRODUCTS from '../constants/products';
import type { IStatus } from '@/commons/entities/global.interfaces';
import {
  exportDetail,
  exportSummary,
  getProductDetailData,
} from '../services/bbpServices';
import type { IDetail, IProduct } from '../entities/bbpInterfaces';
import type { IDetailList } from '../entities/bbpInterfaces';
import useDecryptHelper from '@/commons/helpers/decryptHelper';

const accounts: string[] = [
  PRODUCTS.currentAccount,
  PRODUCTS.currentAccountEUR,
  PRODUCTS.currentAccountUSD,
  PRODUCTS.currentAccountINT,
  PRODUCTS.savingsAccount,
  PRODUCTS.savingsAccountINT,
];
const credits: string[] = [
  PRODUCTS.credit,
  PRODUCTS.creditUSD,
  PRODUCTS.fiduciary,
  PRODUCTS.pymeOrdinary,
  PRODUCTS.pymeBank,
];
const investment: string[] = [
  PRODUCTS.cdt,
  PRODUCTS.leasing,
  PRODUCTS.leasingFinancial,
  PRODUCTS.leasingOperative,
];

const useBBPDetail = () => {
  const bbpStore = useBbpStore();
  const decryptHelper = useDecryptHelper();
  const { getProduct, getProductDetail, getRQId } = storeToRefs(bbpStore);
  const getProductSubTitle = ref<string>('');
  const productList = ref<IProduct[]>([getProduct.value]);
  const columnValue = ref<string>('');
  const moneySymbol = ref<string>('$');
  const fileType = ref<'pdf' | 'xls'>('pdf');

  onUnmounted(() => {
    bbpStore.$cleanStore();
  });

  const getDetail = computed<any[]>(() => {
    const itemsToRemove = [
      'Money_symbol',
      'Product_name',
      'Product_number',
      'Product_type',
      'Product_state',
      'Available_balance',
    ];
    const obj: any = removeProperties(getProductDetail.value, itemsToRemove);
    const keys = Object.keys(obj);
    const middleIndex = Math.floor(keys.length / 2);
    const list = [
      keys
        .slice(0, middleIndex)
        .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {}),
      keys
        .slice(middleIndex)
        .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {}),
    ];
    return list;
  });

  const removeProperties = (obj: IDetailList, propertiesToRemove: string[]) => {
    const newObj = JSON.parse(JSON.stringify(obj));
    propertiesToRemove.forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
        delete newObj[prop];
      }
    });
    return newObj;
  };

  const getProductID = computed<string>(() => {
    return getProduct.value.id;
  });

  const { isFetching } = useQuery(
    ['BBP Data'],
    () => getProductDetailData(getProductID.value),
    {
      onSuccess: (data: { status: IStatus; response: any[] }) => {
        const rqUID: IDetail = data.response[0].rqUID;
        const detailList: IDetailList = data.response[1];
        bbpStore.setProductDetail(detailList);
        bbpStore.setRqUID(rqUID);
      },
      onError: (error: any) => {
        bbpStore.setAlertCode(error.response.data.code);
        bbpStore.setAlertMsg(error.response.data.message);
        bbpStore.toggleAlert();
      },
    },
  );

  const movementsButtonEnabled = computed<boolean>(() => {
    const productType: string = getProduct.value.engAcctDesc;
    const isAccount: boolean = accounts.includes(productType);
    const isRevolving: boolean = productType == PRODUCTS.creditRevolving;
    return isAccount || isRevolving ? true : false;
  });

  const getHeaders = computed<{ title: string; property: string }[]>(() => {
    const productType = getProduct.value.engAcctDesc;
    let column3: string;
    if (!!getProductDetail.value.Money_symbol) {
      moneySymbol.value = getProductDetail.value.Money_symbol.amt;
    }
    if (accounts.includes(productType)) {
      (columnValue.value =
        moneySymbol.value + getProductDetail.value.Available_balance?.amt!),
        (column3 = i18n.global.t(
          'BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.AVAILABLE-BALANCE',
        ));
      !!getProduct.value.isActivated
        ? (getProductSubTitle.value = i18n.global.t(
            'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.INACTIVE',
          ))
        : (getProductSubTitle.value = i18n.global.t(
            'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.ACTIVE',
          ));
    }
    if (credits.includes(productType)) {
      columnValue.value = getProductDetail.value.Current_balance?.amt!;
      column3 = i18n.global.t(
        'BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.BALANCE-TO-DAY',
      );
    }
    if (investment.includes(productType)) {
      columnValue.value = getProductDetail.value.OpenDt?.amt!;
      column3 = i18n.global.t(
        'BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.START-DATE',
      );
      if (productType === PRODUCTS.cdt) {
        !!getProduct.value.isActivated
          ? (getProductSubTitle.value = i18n.global.t(
              'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.INACTIVE',
            ))
          : (getProductSubTitle.value = i18n.global.t(
              'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.ACTIVE',
            ));
      } else {
        getProductSubTitle.value = getProductSubTitle.value = i18n.global.t(
          'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.LEASING-TYPE',
        );
      }
    }
    if (productType == PRODUCTS.creditCard) {
      (columnValue.value =
        moneySymbol.value + getProductDetail.value.Full_payment_weights?.amt!),
        (column3 = i18n.global.t(
          'BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.TOTAL-PAYMENT',
        ));
      !!getProduct.value.isActivated
        ? (getProductSubTitle.value = i18n.global.t(
            'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.INACTIVE',
          ))
        : (getProductSubTitle.value = i18n.global.t(
            'BALANCE-BY-PRODUCTS-MODULE.TABLE.DETAIL.ACTIVE',
          ));
    }
    if (productType == PRODUCTS.creditRevolving) {
      (columnValue.value =
        moneySymbol.value + getProductDetail.value.Quota_approved?.amt!),
        (column3 = i18n.global.t(
          'BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.APROVED-LIMIT',
        ));
    }
    return [
      {
        title: i18n.global.t('BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.NAME'),
        property: 'name',
      },
      {
        title: i18n.global.t('BALANCE-BY-PRODUCTS-MODULE.TABLE.HEADER.NUMBER'),
        property: 'value',
      },
      { title: column3!, property: 'name' },
    ];
  });

  const exportSummaryMutation = useMutation(['spinner'], exportSummary, {
    onSuccess: (data: any) => {
      decryptHelper.createFile(data, fileType.value);
    },
    onError: (error: any) => {
      bbpStore.setAlertCode(error.response.data.code);
      bbpStore.setAlertMsg(error.response.data.message);
      bbpStore.toggleAlert();
    },
  });

  const exportDetailMutation = useMutation(['spinner'], exportDetail, {
    onSuccess: (data: any) => {
      decryptHelper.createFile(data, fileType.value);
    },
    onError: (error: any) => {
      bbpStore.setAlertCode(error.response.data.code);
      bbpStore.setAlertMsg(error.response.data.message);
      bbpStore.toggleAlert();
    },
  });

  const exportFile = (type: 'pdf' | 'xls') => {
    fileType.value = type;
    const productType = getProduct.value.acctType;
    const rQUId = getRQId.value.amt;
    if (productType === 'DDA' || productType === 'SDA') {
      exportDetailMutation.mutate({
        productType: productType,
        fileTypeExport: type,
        rqUID: rQUId,
      });
    } else {
      exportSummaryMutation.mutate({
        fileTypeExport: type,
        rqUID: rQUId,
      });
    }
  };

  return {
    getHeaders,
    getProduct,
    productList,
    columnValue,
    getProductSubTitle,
    getDetail,
    isFetching,
    movementsButtonEnabled,
    exportFile,
  };
};

export default useBBPDetail;
