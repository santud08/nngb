export const validatePhoneNumber = (phone) => {
  const pattern = /^[0-9]{10}$/;
  if (!pattern.test(phone)) {
    return "Phone number can only contain numeric with minimum 10 digit.";
  }
  return true;
};
