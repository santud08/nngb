export const dwellingHouseSize = async (key = null) => {
  const listArr = {
    lt9p: "Less than 9 pyeong (32m2)",
    "1019p": "10-19 pyeong (33-65m2)",
    "2029p": "20-29 pyeong (66-98m2)",
    "3039p": "30-39 pyeong (99-131m2)",
    "4049p": "40-49 pyeong (132-164m2)",
    mt50p: "More than 50 pyeong (165-195m2)",
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
