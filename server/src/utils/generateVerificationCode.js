const getVerificationCode = () => {
  const min = 100000;
  const max = 999999;
  const vaerificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
  return vaerificationCode;
};

module.exports = getVerificationCode;
