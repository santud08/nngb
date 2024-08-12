export const houseWife = async (key = null) => {
  const listArr = {
    housewife: "Housewife",
    working_housewife: "Working housewife",
    not_a_housewife: "Not a housewife",
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
