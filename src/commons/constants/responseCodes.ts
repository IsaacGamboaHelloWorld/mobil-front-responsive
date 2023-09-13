export const responseCodes = {
  auth: {
    sendUserRSAKey: '/api/keys/',
    sendLogin: {
      succes: '0',
      errorSesion: '300801',
    },
    sendAuth: {
      succes: '0',
      updateImage: '300362',
      updatePassword: '300364',
      updateIP: '700400',
      updateAll: '300363',
    },
    changeImage: {
      imageWasUsedBefore: '300202',
    },
  },
  sblCodes: {
    success: '000',
    retry: '800',
  },
  transfer: {
    newTransfer: {
      success: '0',
      timeOut: '999001',
      maxAmount: '9999101',
      maxDailyAmount: '9999102',
      pending: '9999002',
      programmed: '9999069',
      wrongPassword: '300182',
      wrongToken: '300173',
    },
  },
};

export const sblOptionCodes = {
  login: '02003',
  authorizations: '211',
};

export const moduleCodes = {
  movements: '10202',
  authorizations: '211',
  myBank: '114',
  transfers: '20201',
  bbpCode: '10101',
};

export const authBlockCodes: string[] = [
  '300172',
  '300802',
  '300360',
  '300367',
  '300368',
  '380502',
  '300138',
  '300169',
  '300190',
  '300361',
  '300375',
  '300366',
];
