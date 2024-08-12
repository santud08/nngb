export const vehiclePossession = async (key = null) => {
  const listArr = {
    yes: "Yes",
    no: "No",
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
