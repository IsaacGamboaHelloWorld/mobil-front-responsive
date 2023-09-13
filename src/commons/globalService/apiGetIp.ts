import axios from 'axios';

export const apiGetIp = axios.create({
  baseURL: 'https://api.ipify.org',
});

export const apiGetIpSecondMethod = axios.create({
  baseURL: 'https://api.bigdatacloud.net/data/client-ip',
});
