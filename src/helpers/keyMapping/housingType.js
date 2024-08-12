export const housingType = async (key = null) => {
  const listArr = {
    officetels: "Officetels",
    apartment: "Apartment",
    house: "House",
    residential_complex: "Residential Complex",
    township_villa: "Township/Villa",
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
