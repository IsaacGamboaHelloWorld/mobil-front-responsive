export const staticsPath: string = import.meta.env.VITE_S3_PATH;
export const validatePermitions: boolean = !(
  import.meta.env.VITE_VALIDATE_PERMITIONS === 'false'
);
