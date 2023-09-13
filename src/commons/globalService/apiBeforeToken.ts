import axios from 'axios';
import useGeneralHelper from '../helpers/generalHelper';

const port: string = import.meta.env.VITE_PORT;
const appCtx: string = import.meta.env.VITE_CTX;
const url: string = import.meta.env.VITE_BASE_URL;
const pathLastPart: string = import.meta.env.VITE_PATH_LAST_PART;
const apiKey: string = import.meta.env.VITE_API_KEY;
const companyId: string = import.meta.env.VITE_BANK_ID;

const { getRandomIntInclusive } = useGeneralHelper();

const apiBeforeToken = axios.create({
  baseURL: `${url}${port}${appCtx}${pathLastPart}`,
});

apiBeforeToken.defaults.headers.common['x-api-key'] = !!apiKey ? apiKey : null;

apiBeforeToken.defaults.headers.common['X-CompanyId'] = companyId || '';
apiBeforeToken.defaults.headers.common['X-Channel'] = 'BBS';
apiBeforeToken.defaults.headers.common['X-GovIssueIdentType'] =
  localStorage.getItem('GovIssueIdentType') || '';
apiBeforeToken.defaults.headers.common['X-IdentSerialNum'] =
  localStorage.getItem('IdentSerialNum') || '';

apiBeforeToken.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'X-RqUID': getRandomIntInclusive(
      100000000000000,
      999999999999999,
    ).toString(),
  };
  return config;
});

export default apiBeforeToken;
