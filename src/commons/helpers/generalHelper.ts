const useGeneralHelper = () => {
  const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  return {
    getRandomIntInclusive,
  };
};

export default useGeneralHelper;
