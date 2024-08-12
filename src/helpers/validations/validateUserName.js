export const validateUserName = (userName) => { ///^[a-z0-9]+$/;
  const pattern = /^[a-zA-Z가-힣\s]+$/;
  if (!pattern.test(userName)) {
    return "User name can only contain alphabets,korean alphabets and space.";
  }
  return true;
};
