export const lastDegree = async (key = null) => {
  const listArr = {
    lthsg: "Less than high school graduation (including elementary/middle/high school attendance)",
    hsg: "high school graduate",
    ac: "attending college",
    cg: "college graduation",
    ags: "attending graduate school",
    gsgc: "Graduate school graduation/completion",
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
