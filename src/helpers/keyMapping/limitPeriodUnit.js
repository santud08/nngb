export const limitPeriodUnit = async (key = null) => {
  const listArr = {
    pc: "per case",
    pd: "per day",
    pm: "per month",
    pw: "per week",
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
