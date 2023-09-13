import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt';

const RSAEncrypt = (publicKey: string, value: string): string | false => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(value);
};

export default RSAEncrypt;
