export const validateUserID = (userID) => { ///^[a-z0-9]+$/;
  const pattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]+$/;
  if (!pattern.test(userID)) {
    return "User ID can only contain lowercase English letters and numbers.";
  }
  return true;
};
