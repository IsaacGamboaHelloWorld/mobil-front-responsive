const useBlockCodes = () => {
  const isBlockCode = (codeList: string[], code: string): boolean => {
    const prueba = codeList.some((item) => item === code);
    return prueba;
  };
  return {
    isBlockCode,
  };
};

export default useBlockCodes;
