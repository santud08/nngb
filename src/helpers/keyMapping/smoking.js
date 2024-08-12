export const smoking = async (key = null) => {
  const listArr = {
    smoking: "Smoking",
    non_smoking: "Non smoking",
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
