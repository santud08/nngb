export const vehicleClass = async (key = null) => {
  const listArr = {
    kyung_seung_yong: "Kyung Seung-yong",
    small_type: "Small Type",
    semi_medium: "Semi-medium",
    medium: "Medium",
    semi_large: "Semi-large",
    compact_suv: "Compact SUV",
    midsize_suv: "Midsize SUV",
    semi_midsize_suv: "Semi Midsize SUV",
    large_suv: "Large SUV",
    eco_friendly: "Eco-friendly (electricity, hydrogen)",
    truck: "Truck",
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
