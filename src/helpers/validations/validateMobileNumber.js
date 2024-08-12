export const validateMobileNumber = (mobile) => {
  const pattern = /^[0-9]{10}$/;
  if (!pattern.test(mobile)) {
    return "Mobile number can only contain numeric with minimum 10 digit.";
  }
  return true;
};
