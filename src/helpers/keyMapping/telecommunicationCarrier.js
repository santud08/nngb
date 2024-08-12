export const teleCommunicationCarrier = async (key = null) => {
  const listArr = {
    skt: "SKT",
    kt: "KT",
    lgt: "LGT",
    cheap_phone: "Cheap Phone",
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
