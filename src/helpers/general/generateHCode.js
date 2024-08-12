export const generateHCode = (contactPersonId) => {
  const contactPersonIdStr = contactPersonId.toString();
  const digitCount = contactPersonIdStr.length;

  let hcode = "H";

  if (digitCount < 4) {
    const zerosToAdd = 4 - digitCount;
    hcode += "0".repeat(zerosToAdd) + contactPersonIdStr;
  } else {
    hcode += contactPersonIdStr;
  }

  return hcode;
};
