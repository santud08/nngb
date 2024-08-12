export const cellPhoneManufacturer = async (key = null) => {
  const listArr = {
    samsung: "Samsung",
    lg_electronics: "LG Electronics",
    apple: "Apple",
    etc: "Etc",
  };

  if (key) {
    let retStr = "";
    if (listArr[key]) {
      retStr = listArr[key];
    }
    return retStr;
  } else {
    return listArr;
  }
};
