import type {
  IAuthorization,
  IListToAuthorize,
  IAuthorizedList,
  IListToReject,
} from '../entities/authorizationsInterfaces';

export const initAuthorizationsState: IAuthorization = {
  action: 'Crear',
  authorizationsType: 'monetary',
  code: '20101',
  creator: 'autorizacionesResponsivo052023',
  date: '2023/05/12',
  destinationAccount: '8901651561320321',
  edited: '',
  fileId: '',
  fullName: 'María Francisca Caro Cáceres Muñoz Guzman Gómez Ibarra #&&&',
  id: '124098',
  isFile: '',
  isMonetary: 'true',
  recipient: '',
  service: 'Nóminas, Proveedores y Libranzas',
  serviceAlt: 'Payroll, Providers and Payday Loan',
  typeList: 'monetaryAuthoritations',
  value: '89000',
  webId: '-1694270979',
  aliasFileName: '',
  aliasFileType: '',
  dynamicCustomValue: '',
  paymentReference: 'N/A',
  transactionAmount: '',
};

export const initAuthorizationDetailState = {
  icbsRoleGroupDetailDTO: [
    {
      roleGroupId: 7287,
      groupName: 'Responsabilidad 1',
      statusCode: 'A',
      approvers: 6,
      pendingApprovers: 5,
      roleQuantity: [
        {
          roleId: 2007,
          roleName: 'rolResponsivo',
          roleQuantity: 1,
          roleApproveQuantity: 0,
          rolePendingQuantity: 1,
        },
      ],
    },
  ],
  transactionFullDetailDTO: [
    {
      name: 'productType',
      value: 'Crédito',
      langText: 'Tipo Producto',
    },
    {
      name: 'cmbaccountID',
      value: 'CRED4930',
      langText: 'Nombre Producto Origen',
    },
    {
      name: 'AcctID2',
      value: '*******4930',
      langText: 'No. Producto',
    },
    {
      name: 'startDtVis',
      value: '2023/05/12',
      langText: 'Fecha de Pago',
    },
    {
      name: 'cmbidentificationType',
      value: 'Cédula Extranjería',
      langText: 'Tipo Identificación',
    },
    {
      name: 'nroID',
      value: '1321471572',
      langText: 'No. Identificación',
    },
    {
      name: 'beneficiary',
      value: 'Pacho Maturana',
      langText: 'Beneficiario',
    },
    {
      name: 'amt',
      value: '89000',
      langText: 'Valor a Pagar',
    },
    {
      name: 'cmbentityDestiny',
      value: 'Banco AV Villas',
      langText: 'Entidad Financiera',
    },
    {
      name: 'cmbproductTypeDestiny',
      value: 'Crédito',
      langText: 'Tipo Producto',
    },
    {
      name: 'cmbaccountDestiny',
      value: '8901651561320321',
      langText: 'Producto Destino',
    },
    {
      name: 'cmbpaymentType',
      value: 'NOMINA',
      langText: 'Tipo de Pago',
    },
    {
      name: 'refId',
      value: '',
      langText: 'Referencia / No. Factura',
    },
    {
      name: 'infoAdditional',
      value: '',
      langText: 'Información Adicional',
    },
  ],
  fullDetailDTOFile: null,
};

export const initListToAuthorize: IListToAuthorize = {
  credential: '',
  transactions: [
    {
      id: '',
      isFile: '',
      isMonetary: '',
      serviceAction: '',
      serviceName: '',
      serviceNameAlt: '',
    },
  ],
};

export const initListToReject: IListToReject = {
  credential: '',
  rejectionMotive: '',
  transactions: [
    {
      id: '',
      isFile: '',
      isMonetary: '',
      serviceAction: '',
      serviceName: '',
      serviceNameAlt: '',
    },
  ],
};
export const initAuthorizedList: IAuthorizedList = {
  id: '',
  serviceName: '',
  serviceNameAlt: '',
  transactionDate: '',
  transactionAmount: '',
  creatorUserName: '',
  fullName: '',
  isMonetary: '',
  statusCode: '',
  serviceResquest: '',
  relatedCode: '',
  destinationAccount: '',
  approveRejectDate: '',
  infoMotive: '',
  authCode: '',
  transactionFullDetailDTO: [],
};
