import { useAuthStore } from '../store/useAuthStore';
import { storeToRefs } from 'pinia';

const useSecurityModal = () => {
  const authStore = useAuthStore();
  const { securityModalVisible } = storeToRefs(authStore);
  const toggleSecurityModal = (): void => {
    securityModalVisible.value = !securityModalVisible.value;
  };
  return {
    securityModalVisible,
    toggleSecurityModal,
  };
};

export default useSecurityModal;
