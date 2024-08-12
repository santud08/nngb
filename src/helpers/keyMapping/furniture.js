export const furniture = async (key = null) => {
  const listArr = {
    oph: "One-person households",
    mcrs: "Married couple (respondent + spouse)",
    cuc: "couple + unmarried child",
    spuc: "single parent + unmarried child",
    ahw3omg: "All households with 3 or more generations",
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
