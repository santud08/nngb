export const vehicleBrands = async (key = null) => {
  const listArr = {
    hyundai: "Hyundai",
    kia: "Kia",
    ssangyong: "Ssangyong",
    chevrolet: "Chevrolet",
    renault: "Renault",
    toyota: "Toyota",
    nissan: "Nissan",
    honda: "Honda",
    ford: "Ford",
    volkswagen: "Volkswagen",
    bmw: "BMW",
    benz: "Benz",
    audi: "Audi",
    volvo: "Volvo",
    land_rover: "Land Rover",
    lincoln: "Lincoln",
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
