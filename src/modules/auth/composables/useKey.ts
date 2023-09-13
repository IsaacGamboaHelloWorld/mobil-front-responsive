import { useMutation } from '@tanstack/vue-query';
import { computed } from 'vue';

import { endPoints } from '@/commons/constants/endPoints';
import api from '@/commons/globalService/global.service';
import { useAuthStore } from '../store/useAuthStore';
import type { IAuthUserRSAKey } from '../entities/authInterfaces';
import { storeToRefs } from 'pinia';

const useUserRSAKey = () => {
  const authStore = useAuthStore();
  const { icbsUser, currentStep } = storeToRefs(authStore);

  const sendUser = async (icbsUser: string): Promise<IAuthUserRSAKey> => {
    const { data } = await api.post<IAuthUserRSAKey>(
      endPoints.auth.sendUserRSAKey,
      {
        username: icbsUser,
      },
    );
    return data;
  };

  const userRSAKeyMutation = useMutation(sendUser, {
    onError: (context: any) => {},
    onSuccess: (data) => {
      authStore.setUserRSAKeyState(data);
      currentStep.value = '';
    },
  });

  const isDisabled = computed<boolean>(() =>
    icbsUser.value.length > 0 ? false : true,
  );

  return {
    userRSAKeyMutation,
    isDisabled,
    icbsUser,
  };
};

export default useUserRSAKey;
