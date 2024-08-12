export const generateCCode = (contactPersonId) => {
  const personIdStr = contactPersonId.toString();
  const digitCount = personIdStr.length;

  let code = "C";

  if (digitCount < 4) {
    const zerosToAdd = 4 - digitCount;
    code += "0".repeat(zerosToAdd) + personIdStr;
  } else {
    code += personIdStr;
  }

  return code;
};
