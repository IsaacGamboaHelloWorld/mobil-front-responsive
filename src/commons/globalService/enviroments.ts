import { computed } from 'vue';
import { companyName } from '../constants/companyName';

const useEnviroments = () => {
  const getEnv = computed<{
    baseUrl: string;
    vitePort: string;
    viteCTX: string;
    apiKey?: string;
    viteLastPart: string;
  } | null>(() => {
    //ENVIROMENT QA-ATH------------------------------------------------------------------------------------------
    if (import.meta.env.VITE_TEALIUM_ENVIROMENT === 'qa') {
      if (companyName === 'bpop') {
        return {
          baseUrl: 'https://r4kyu01mue.execute-api.us-east-1.amazonaws.com/',
          vitePort: '',
          viteCTX: 'stage-public-bpop',
          apiKey: 'KEMm8uiHtSMq1yxIpXxGSQuI373tbu5PY4gOWp20',
          viteLastPart: '',
        };
      } else if (companyName === 'bavv') {
        return {
          baseUrl: 'https://4vvlyij3xj.execute-api.us-east-1.amazonaws.com/',
          vitePort: '',
          viteCTX: 'stage-public-bavv',
          apiKey: 'D0hypy2xDI1g31OCAUdoSEbA6jpN1Xe2FBD5rRvh',
          viteLastPart: '',
        };
      } else if (companyName === 'bbog') {
        return {
          baseUrl: ' https://ge2ysl4ste.execute-api.us-east-1.amazonaws.com/',
          vitePort: '',
          viteCTX: 'stage-public-bbog',
          apiKey: 'j0E1E9o9z94UbbPDu8QXSaNX0zh1GnnZ69XROojm',
          viteLastPart: '',
        };
      } else {
        return {
          baseUrl: 'https://l60jfxt487.execute-api.us-east-1.amazonaws.com/',
          vitePort: '',
          viteCTX: 'stage-public-bocc',
          apiKey: 'H09OdeMd523EKE702NWHfawduHBzP9z98pErMtm1',
          viteLastPart: '',
        };
      }
      //ENVIROMENT QA-GINKO------------------------------------------------------------------------------------------
    } else if (
      import.meta.env.VITE_TEALIUM_ENVIROMENT === 'dev' ||
      import.meta.env.VITE_TEALIUM_ENVIROMENT === 'qa-ginko'
    ) {
      if (companyName === 'bpop') {
        return {
          baseUrl: 'http://10.0.2.47:',
          vitePort: '7003',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          viteLastPart: '/api',
        };
      } else if (companyName === 'bavv') {
        return {
          baseUrl: 'http://10.0.2.47:',
          vitePort: '7003',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          viteLastPart: '/api',
        };
      } else if (companyName === 'bbog') {
        return {
          baseUrl: 'http://10.0.2.47:',
          vitePort: '7003',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          viteLastPart: '/api',
        };
      } else {
        return {
          baseUrl: 'http://10.0.2.47:',
          vitePort: '7003',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          viteLastPart: '/api',
        };
      }
      //ENVIROMENT QA-G3------------------------------------------------------------------------------------------
    } else if (import.meta.env.VITE_TEALIUM_ENVIROMENT === 'qa-g3') {
      if (companyName === 'bpop') {
        return {
          baseUrl: 'http://10.130.13.173:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      } else if (companyName === 'bavv') {
        return {
          baseUrl: 'http://10.130.13.179:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      } else if (companyName === 'bbog') {
        return {
          baseUrl: 'http://10.130.13.176:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      } else {
        return {
          baseUrl: 'http://10.130.13.170:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      }
      //ENVIROMENT QA-G2------------------------------------------------------------------------------------------
    } else if (import.meta.env.VITE_TEALIUM_ENVIROMENT === 'qa-g2') {
      if (companyName === 'bpop') {
        return {
          baseUrl: 'http://10.130.2.89:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      } else if (companyName === 'bavv') {
        return {
          baseUrl: 'http://10.130.2.87:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      } else if (companyName === 'bbog') {
        return {
          baseUrl: 'http://10.130.2.85:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      } else {
        return {
          baseUrl: 'http://10.130.2.91:',
          vitePort: '7094',
          viteCTX: '/icbs-mobil-back-apirest-backend',
          apiKey: '',
          viteLastPart: '/api',
        };
      }
    } else {
      return null;
    }
  });

  return {
    getEnv,
  };
};

export default useEnviroments;
