export const surveyMethods = async (key = null) => {
  const listArr = {
    online_survey_creation: "online survey creation",
    panel_rental: "panel rental",
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
