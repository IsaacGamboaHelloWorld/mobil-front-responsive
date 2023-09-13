import type { IStatus } from '@/commons/entities/global.interfaces';

export interface IMovementType {
  code: string;
  name: string;
  acctTypeRestriction: string;
  acctDescRestriction: string;
}

export interface ISearchForm {
  accountID: string;
  acctCur: string;
  acctType: string;
  dateType: string;
  endDt: string;
  highCurAmt: string;
  lowCurAmt: string;
  startDt: string;
  trnType: string;
  moveType: string;
}

export interface IMovementTypes {
  code: string;
  name: string;
  acctTypeRestriction: string;
  acctDescRestriction: string;
}

export interface ICalendarParameters {
  value?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  monthPeriod?: string;
  time?: string;
  today?: string;
  yesterday?: string;
  lastWeek?: string;
  tomorrow?: string;
  firstFayLastMonth?: string;
  endDayLastMonth?: string;
}

export interface IMovementsParameters {
  movementTypes: IMovementTypes[];
  consultPeriodDTO: ICalendarParameters;
}

export interface IMovementsParametersResponse {
  status: IStatus;
  response: {
    movementTypes: IMovementTypes[];
    consultPeriodDTO: ICalendarParameters;
    fileRequestType: string;
  };
}

export interface IMovement {
  rowId: string;
  rowIdFecha: string;
  fechaAplicacion: string;
  hora: string;
  transaccion: string;
  oficina: string;
  descripcionOficina: string;
  numeroDocumento: string;
  debitos: string;
  creditos: string;
  valorEfectivo: string;
  valorCheque: string;
  valorTotal: string;
  referencia1: string;
  referencia2: string;
  saldoInicial: string;
  saldoFinal: string;
  imagen: string;
  moneySymbol: string;
  xFerId: string;
}

export interface IMovementResponse {
  response: {
    rqUID: string;
    todayMovementRs: IMovement[];
  };
  status: IStatus;
}

export interface IRequestFileResponse {
  status: IStatus;
  response: {
    rqUID: string;
    todayMovementRs: any;
  };
}
