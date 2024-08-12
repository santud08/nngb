export const drinking = async (key = null) => {
  const listArr = {
    drinking: "Drinking",
    non_drinking: "Non-drinking",
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
