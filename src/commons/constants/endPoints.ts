export const endPoints = {
  globalServices: {
    acounts: '/accounts/',
  },
  auth: {
    changeLanguage: '/changelanguage',
    sendUserRSAKey: '/keys/',
    sendLogin: '/login',
    sendAuth: '/auth',
    changePassword: '/auth/changepass',
    sendPass: '/auth/sendpass',
    parameters: '/parameters',
    getCategories: '/auth/changeimage/category',
    getImages: '/auth/changeimage/category/',
    changeImage: '/auth/changeimage',
    setIP: '/auth/assignip',
    credentials: '/credential',
  },
  homeFront: {
    getHomeData: '/home/parameters',
    logout: '/logout',
  },
  myBank: {
    getSummaryData: '/balances/summary',
    exportSummary: '/balances/summary/export',
    exportSummaryDetail: '/balances/summary/detail/export',
  },
  balanceByProducts: {
    getProductData: '/accounts/',
    getDetail: '/balances/',
    export: '/balances/summary/export',
    exportDetail: '/balances/summary/detail/export',
  },
  productDetail: {
    getProductDetail: 'api/balances/',
  },
  movements: {
    getParameters: '/priordaysmovements/parameters?accttype=',
    priorDaysMovements: '/priordaysmovements',
    requestFIle: '/priordaysmovements/requestfile',
    export: '/priordaysmovements/export',
  },
  authorizations: {
    getAuthorizations: '/authorizations',
    getAuthorization: '/authorizations/',
    accept: '/authorizations/accept',
    reject: '/authorizations/reject',
    rejectExport: '/authorizations/reject/export',
    acceptExport: '/authorizations/accept/export',
  },
  sbl: {
    initPush: '/transaction/initPush',
    pushResult: '/transaction/result',
    initSoft: '/transaction/initSoftToken',
    softAuthorize: '/transaction/authorize',
    cancel: '/transaction/cancel',
    verify: '/transaction/verify',
  },
  transfers: {
    lastTransfersParameters: '/internaltransfer/parameters',
    lastTransfers: '/internaltransfer/searchtransactions',
    lastTransfersDetail: '/internaltransfer/',
    getAccountDestiny: '/internaltransfer/accountdestiny',
    addFundTransfer: '/internaltransfer',
    export: '/internaltransfer/export',
    getParameters: '/internaltransfer/parameters',
    getNTParameters: '/internaltransfer/transactions/parameters',
    getTemplateParameters: '/internaltransfer/templates/parameters',
    listTemplate: '/internaltransfer/templates',
    templateDetail: '/internaltransfer/templates/',
    searchUsers: '/internaltransfer/templates/share/searchusers',
    shareTemplate: '/internaltransfer/templates/share',
    sheduleTransfersParameters: '/internaltransfer/scheduleds/parameters',
    sheduleTransfers: '/internaltransfer/scheduleds',
    sheduleTransfersDetail: '/internaltransfer/scheduleds/',
  },
};
