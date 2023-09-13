import { validatePermitions } from '../constants/envConstants';
import type { IPermitions } from '../entities/global.interfaces';

const usePermitionHelper = () => {
  const hasPermitions = (code: string, permition: IPermitions): boolean => {
    if (!!validatePermitions) {
      return permition.childs!.some((permition) => permition.code === code);
    }
    return true;
  };
  return { hasPermitions };
};

export default usePermitionHelper;
