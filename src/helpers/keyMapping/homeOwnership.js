export const homeOwnership = async (key = null) => {
  const listArr = {
    own: "Own (owned by you or a family member)",
    charter: "Charter",
    monthly: "Monthly",
    permanent_lease: "Permanent Lease",
    private_house: "Private House",
    etc: "Etc",
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
