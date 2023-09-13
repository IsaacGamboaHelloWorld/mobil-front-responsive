import { companyName } from '@/commons/constants/companyName';
export interface IserviceLine {
  city: string;
  phone: string;
}

export const serviceLinesBusiness = (): IserviceLine[] => {
  let array: IserviceLine[] = [{ city: '', phone: '' }];
  if (companyName === 'bpop') {
    array = [
      { city: 'Bogotá', phone: '(601) 743 4646' },
      { city: 'Línea nacional', phone: '01 8000 18 4646' },
    ];
  } else if (companyName === 'bbog') {
    array = [
      { city: 'Cali', phone: '(602) 898 4949' },
      { city: 'Bogotá', phone: '(601) 364 7400' },
      { city: 'Medellín', phone: '(604) 576 7680' },
      { city: 'Barranquilla', phone: '(605) 371 1400' },
      { city: 'Bucaramanga', phone: '(607) 647 5050' },
    ];
  } else if (companyName === 'bocc') {
    array = [
      { city: 'Cali', phone: '(602) 485 1113' },
      { city: 'Bogotá', phone: '(601) 390 2058' },
      { city: 'Medellín', phone: '(604) 605 2020' },
      { city: 'Barranquilla', phone: '(605) 386 9772' },
      { city: 'Línea internacional', phone: '01 8804 53 8044' },
      { city: 'Línea nacional', phone: '01 8000 51 4652' },
    ];
  } else if (companyName === 'bavv') {
    array = [
      { city: 'Cali', phone: '(602) 885 9595' },
      { city: 'Bogotá', phone: '(601) 444 1777' },
      { city: 'Medellín', phone: '(604) 325 6000' },
      { city: 'Barranquilla', phone: '(605) 330 4330' },
      { city: 'Bucaramanga', phone: '(607) 630 2980' },
      { city: 'Línea nacional', phone: '01 8000 51 8000' },
    ];
  }
  return array;
};
