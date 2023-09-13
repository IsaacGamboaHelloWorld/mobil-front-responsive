import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { companyName } from '@/commons/constants/companyName';
import { useHomeFrontStore } from '../store/useHomeFrontStore';
import { loadHomeFrontData } from '../services/homeFrontServices';
import type { IHomeData } from '../entities/homeFrontInterfaces';

const navIsActive = ref<boolean>(false);

const navSwitchState = (): void => {
  navIsActive.value ? (navIsActive.value = false) : (navIsActive.value = true);
};

const turnOffNavSwitch = (): void => {
  navIsActive.value = false;
};

const useHomeFrontModule = () => {
  const homeFrontStore = useHomeFrontStore();

  const { isLoading } = useQuery(['HeaderHomeFrontData'], loadHomeFrontData, {
    onSuccess: (data: IHomeData) => {
      homeFrontStore.setHomeFrontState(data);
      localStorage.setItem('companyId', data.response?.icbsBankCode!);
      localStorage.setItem(
        'GovIssueIdentType',
        data.response?.identificationType!,
      );
      localStorage.setItem('IdentSerialNum', data.response?.identification!);
    },
    refetchInterval: 1000 * 60,
  });

  return {
    isLoading,
    companyName,
    navIsActive,
    navSwitchState,
    turnOffNavSwitch,
  };
};
export default useHomeFrontModule;
