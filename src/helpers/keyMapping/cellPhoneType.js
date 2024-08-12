export const cellPhoneType = async (key = null) => {
  const listArr = {
    gmp: "General mobile phone (feature phone)",
    smartphone: "Smartphone",
    ubrmpas: "Use both regular mobile phones (feature phones) and smartphones",
    dump: "don't use mobile phone",
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
