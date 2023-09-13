import axios from 'axios';
import useGeneralHelper from '../helpers/generalHelper';

const port: string = import.meta.env.VITE_PORT;
const appCtx: string = import.meta.env.VITE_CTX;
const url: string = import.meta.env.VITE_BASE_URL;
const pathLastPart: string = import.meta.env.VITE_PATH_LAST_PART;
const apiKey: string = import.meta.env.VITE_API_KEY;
const companyId: string = import.meta.env.VITE_BANK_ID;

const { getRandomIntInclusive } = useGeneralHelper();

const api = axios.create({
  baseURL: `${url}${port}${appCtx}${pathLastPart}`,
});

api.defaults.headers.common['x-api-key'] = !!apiKey ? apiKey : null;
api.defaults.headers.common['X-Channel'] = 'BBS';

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: !!localStorage.getItem('Authorization')
      ? localStorage.getItem('Authorization')
      : null,
    'x-auth-token': localStorage.getItem('token'),
    'X-CompanyId': companyId || '',
    'X-GovIssueIdentType': !!localStorage.getItem('GovIssueIdentType')
      ? localStorage.getItem('GovIssueIdentType')
      : '',
    'X-IdentSerialNum': !!localStorage.getItem('IdentSerialNum')
      ? localStorage.getItem('IdentSerialNum')
      : '',
    'X-RqUID': getRandomIntInclusive(
      100000000000000,
      999999999999999,
    ).toString(),
  };
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.data.status === '401' &&
      error.response.data.message ===
        'Full authentication is required to access this resource'
    ) {
      localStorage.clear();
      location.reload();
    }

    return Promise.reject(error);
  },
);
export default api;
