export const maritalStatus = async (key = null) => {
  const listArr = {
    single: "Single",
    unmarried: "Unmarried",
    married: "Married",
    divorce: "Divorce",
    widow: "Widow",
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
