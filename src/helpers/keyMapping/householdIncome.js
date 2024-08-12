export const householdIncome = async (key = null) => {
  const listArr = {
    lt10mwpy: "Less than 10 million won per year",
    mt10mwtolt30mwpy: "More than 10 million won ~ less than 30 million won per year",
    mt30mwtolt50wpy: "More than 30 million won ~ less than 50 million won per year",
    mt50mwtolt70mwpy: "More than 50 million won ~ less than 70 million won per year",
    mt70mwtolt100mwpy: "More than 70 million won ~ less than 100 million won per year",
    okrw100mpy: "Over KRW 100 million per year",
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
