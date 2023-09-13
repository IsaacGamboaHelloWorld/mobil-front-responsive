import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt';

const RSAEncrypt = (publicKey: string, value: string): string => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const encryptedValue: string | false = encryptor.encrypt(value);
  if (!encryptedValue) {
    return 'encriptacion no valida';
  } else {
    return encryptedValue;
  }
};

export default RSAEncrypt;
