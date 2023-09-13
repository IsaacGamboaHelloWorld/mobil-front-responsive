import api from '@/commons/globalService/global.service';
import type { IAuth } from '../entities/authInterfaces';

const userRSAKeyService = () => {
  return api.post('keys/', {
    username: 'Fabian',
  });
};

export default userRSAKeyService;
