import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { companyName } from '@/commons/constants/companyName';
import { useHomeFrontStore } from '../store/useHomeFrontStore';

const notificationsAvailable = ref<boolean>(false);

const useNotifications = () => {
  const homeFrontStore = useHomeFrontStore();

  const { getNotificationsList, getTotalPendingTransactions } =
    storeToRefs(homeFrontStore);

  return {
    companyName,
    notificationsAvailable,
    getNotificationsList,
    getTotalPendingTransactions,
  };
};

export default useNotifications;
