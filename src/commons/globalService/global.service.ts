import axios from 'axios';

const port: string = import.meta.env.VITE_PORT;
const appCtx: string = import.meta.env.VITE_CTX;
const url: string = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: `${url}${port}/${appCtx}`,
});

export default api;
