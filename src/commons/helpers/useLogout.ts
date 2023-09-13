import { useQuery } from '@tanstack/vue-query';
import { useRouter, type Router } from 'vue-router';

import api from '../globalService/api';
import { endPoints } from '../constants/endPoints';
import { routesName } from '../constants/routes';

const endSession = async (): Promise<object> => {
  const response = await api.get(endPoints.homeFront.logout);
  return response;
};

const useLogout = () => {
  const router: Router = useRouter();

  const { refetch: fetchLogout } = useQuery(['Logout'], endSession, {
    enabled: false,
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('permitions');
      localStorage.removeItem('user');
      localStorage.removeItem('publicKey');
      localStorage.removeItem('companyId');
      localStorage.removeItem('Channel');
      localStorage.removeItem('GovIssueIdentType');
      localStorage.removeItem('IdentSerialNum');
      localStorage.removeItem('RqUID');
      router.push(routesName.auth.path);
    },
  });
  return {
    fetchLogout,
  };
};

export default useLogout;
