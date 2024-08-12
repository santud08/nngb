export const vehicleType = async (key = null) => {
  const listArr = {
    domestic: "Domestic car",
    imported: "Imported cars",
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
