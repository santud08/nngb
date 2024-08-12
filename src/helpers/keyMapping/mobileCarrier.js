export const mobileCarrier = async (key = null) => {
  const listArr = {
    kt: "KT",
    lg: "LG",
    lgt: "LG Telecom",
    skt: "SKT",
    kt_affordable_phone: "KT Affordable Phone",
    lg_affordable_phone: "LG Affordable Phone",
    skt_affordable_phone: "SKT Affordable Phone",
    ktf: "KTF",
    skm: "SKT Affordable Phone 2",
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
