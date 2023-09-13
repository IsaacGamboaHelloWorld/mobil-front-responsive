const useSortHelper = () => {
  const sortAlphabetically = (
    list: any,
    property: string,
    order: 'up' | 'down',
  ): void => {
    list.sort((a: any, b: any) => {
      const authorizationsTypeA = a[property].toUpperCase();
      const authorizationsTypeB = b[property].toUpperCase();
      if (order === 'up') {
        if (authorizationsTypeA < authorizationsTypeB) {
          return -1;
        }
        if (authorizationsTypeA > authorizationsTypeB) {
          return 1;
        }
        return 0;
      } else {
        if (authorizationsTypeA > authorizationsTypeB) {
          return -1;
        }
        if (authorizationsTypeA < authorizationsTypeB) {
          return 1;
        }
        return 0;
      }
    });
  };

  const sortDates = (list: any, property: string, order: 'up' | 'down') => {
    list.sort(function (a: any, b: any) {
      const dateA = new Date(a[property]);
      const dateB = new Date(b[property]);
      if (order === 'up') return dateA.getTime() - dateB.getTime();
      if (order === 'down') return dateB.getTime() - dateA.getTime();
    });
  };
  const sortNumber = (list: any, property: string, order: 'up' | 'down') => {
    list.sort(function (a: any, b: any) {
      const valueA = Number(a[property]);
      const valueB = Number(b[property]);
      if (order === 'up') return valueA - valueB;
      if (order === 'down') return valueB - valueA;
    });
  };

  const getMinDate = (list: any, property: string): string => {
    if (list.length === 0) {
      return '';
    } else {
      const fechaMasPequena = list.reduce((fechaMinima: any, objeto: any) => {
        return objeto[property] < fechaMinima ? objeto[property] : fechaMinima;
      }, list[0][property]);
      return fechaMasPequena;
    }
  };

  const getMaxDate = (list: any, property: string): string => {
    if (list.length === 0) return '';
    const fechaMasPequena = list.reduce((fechaMinima: any, objeto: any) => {
      return objeto[property] > fechaMinima ? objeto[property] : fechaMinima;
    }, list[0][property]);

    return fechaMasPequena;
  };

  return { sortAlphabetically, sortDates, sortNumber, getMinDate, getMaxDate };
};

export default useSortHelper;
