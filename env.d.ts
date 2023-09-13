/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PROJECT_COMPANY: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: string;
  readonly VITE_CTX: string;
  readonly VITE_S3_PATH: string;
  readonly VITE_VALIDATE_PERMITIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
