import moment from 'moment';

const useFormattHelper = () => {
  const addCurrencyDot = (data: string, currencySimbol?: string): string => {
    !!currencySimbol
      ? (currencySimbol = currencySimbol + '')
      : (currencySimbol = '$ ');
    if (!data) return '';
    const num = data.split('.')[0];
    const numLength = num.length;
    let result = '';
    let dotCount = 0;

    for (let i = numLength - 1; i >= 0; i--) {
      const currentChar = num.charAt(i);
      result = currentChar + result;
      dotCount++;
      if (dotCount === 3 && i > 0) {
        result = ',' + result;
        dotCount = 0;
      }
    }
    if (!!data.split('.')[1] && !!data.split('.')[0]) {
      return currencySimbol + result + '.' + data.split('.')[1];
    }
    if (!!data.split('.')[1] && !data.split('.')[0]) {
      return currencySimbol + '0' + '.' + data.split('.')[1];
    }
    return currencySimbol + result + '.00';
  };

  function formatCurrencyInput(strNum: string) {
    const cents = strNum.slice(-2);
    const intPart = strNum.slice(0, -2);
    const intPartFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (!!intPartFormatted || !!cents) {
      if (!intPartFormatted) return '$ ' + cents;
      return '$ ' + intPartFormatted + ',' + cents;
    }
    return '';
  }

  const formateDate = (date: Date): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const day = date.getDate();

    return `${year}/${formattedMonth.toString()}/${day.toString()}`;
  };

  const separarUltimosDosCaracteres = (value: string): string => {
    return value.length < 2
      ? value
      : value.slice(0, -2) + '.' + value.slice(-2);
  };
  const formatTimeToDate = (time: string): string => {
    const date = moment(time, 'ddd MMM DD HH:mm:ss z YYYY');
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  };

  const formatTimeToHours = (time: string): string => {
    const date = moment(time, 'ddd MMM DD HH:mm:ss z YYYY');
    const formattedTime = date.format('HH:mm');
    return formattedTime;
  };
  return {
    addCurrencyDot,
    formatTimeToDate,
    formatTimeToHours,
    formatCurrencyInput,
    separarUltimosDosCaracteres,
    formateDate,
  };
};

export default useFormattHelper;
