import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { companyName } from '@/commons/constants/companyName';
import { useHomeFrontStore } from '../store/useHomeFrontStore';
import useLogout from '@/commons/helpers/useLogout';
import { useGlobalStore } from '@/stores/globalStore';
import { useRouter, type Router } from 'vue-router';
import { routesName } from '@/commons/constants/routes';

const profileInfoIsVisible = ref<boolean>(false);
const notificationsIsVisible = ref<boolean>(false);

const toggleNotifications = (): void => {
  profileInfoIsVisible.value && toggleProfileInfo();
  notificationsIsVisible.value = !notificationsIsVisible.value;
};

const toggleProfileInfo = (): void => {
  notificationsIsVisible.value && toggleNotifications();
  profileInfoIsVisible.value = !profileInfoIsVisible.value;
};

const useHeader = () => {
  const { fetchLogout } = useLogout();
  const globalStore = useGlobalStore();
  const { sessionClosed } = storeToRefs(globalStore);
  const homeFrontStore = useHomeFrontStore();
  const router: Router = useRouter();

  const logout = (): void => {
    sessionClosed.value = true;
    fetchLogout();
  };

  const navigateHome = (): void => {
    router.push(routesName.Home.path);
  };

  const { getFirstName, getLastName, getCompanyName } =
    storeToRefs(homeFrontStore);

  return {
    navigateHome,
    toggleNotifications,
    toggleProfileInfo,
    logout,
    companyName,
    profileInfoIsVisible,
    notificationsIsVisible,
    getFirstName,
    getLastName,
    getCompanyName,
  };
};
export default useHeader;
