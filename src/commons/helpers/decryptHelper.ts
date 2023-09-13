import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt';

const useDecryptHelper = () => {
  const decrypt = (publicKey: string, value: string): string | false => {
    const decrypt = new JSEncrypt();
    decrypt.setPublicKey(publicKey);
    const uncryptedValue = decrypt.decrypt(value);
    return uncryptedValue;
  };

  const createFile = (
    base64: string,
    fileType: 'xls' | 'pdf',
    nameFile: string = 'saldo de cuenta.',
  ): void => {
    const base64String = base64;
    const binaryArray = new Uint8Array(
      [...atob(base64String)].map((char) => char.charCodeAt(0)),
    );

    const blob = new Blob([binaryArray], {
      type: fileType === 'xls' ? 'application/vnd.ms-excel' : 'application/pdf',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = nameFile;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    decrypt,
    createFile,
  };
};

export default useDecryptHelper;
