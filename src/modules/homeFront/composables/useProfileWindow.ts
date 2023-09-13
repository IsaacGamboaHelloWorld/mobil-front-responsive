import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useHomeFrontStore } from '@/modules/homeFront/store/useHomeFrontStore';
import { companyName } from '@/commons/constants/companyName';

const currentDate = ref<string>('');
const currentHour = ref<string>('');

const setCurrentTime = (): void => {
  const date = new Date();
  const hours: string = ('0' + date.getHours()).slice(-2);
  const minutes: string = ('0' + date.getMinutes()).slice(-2);
  const year: number = date.getFullYear();
  const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const day: string = ('0' + date.getDate()).slice(-2);
  currentDate.value = `${year}/${month}/${day}`;
  currentHour.value = `${hours}:${minutes}`;
};

const useProfileWindow = () => {
  const homeFrontStore = useHomeFrontStore();

  const editProfile = (): void => {
    //Cambiar nombre o imagen de usuario
  };

  setCurrentTime();

  const {
    getFirstName,
    getLastName,
    getCompanyName,
    getID,
    getInternalID,
    getLoginDate,
    getUserIP,
    getLoginHour,
  } = storeToRefs(homeFrontStore);

  return {
    editProfile,
    companyName,
    currentDate,
    currentHour,
    getFirstName,
    getLastName,
    getCompanyName,
    getID,
    getInternalID,
    getLoginDate,
    getUserIP,
    getLoginHour,
  };
};

export default useProfileWindow;
