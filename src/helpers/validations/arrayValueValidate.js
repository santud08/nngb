export const arrayValueValidate = (value, objKeys) => {
  console.log("value", value);
  console.log("value.length", value.length);
  if (value.length > 0) {
    console.log(objKeys);
    if (value.length == 1) {
      value = value[0].split(",");
    }
    console.log("value", value);
    console.log("value.length", value.length);
    for (const inputData of value) {
      //for (const objKeysDetails of objKeys) {
      //checking for string from form data
      //if (inputData && typeof inputData == "string") {
      //const parsedData = JSON.parse(inputData);
      //if (objKeysDetails.keyName in parsedData) {
      // check the key is required or optional
      if (objKeys.option == "required") {
        if (inputData == null || inputData == "") {
          return `array value is required`;
        } else {
          // check for the data type mismatch
          if (!objKeys.validValues.includes(inputData)) {
            console.log("inputData", inputData);
            return `value should be ${objKeys.validValues.toString()}`;
          }
        }
      } else if (objKeys.option == "optional") {
        // check for the data type mismatch
        if (!objKeys.validValues.includes(inputData)) {
          return `value should be ${objKeys.validValues.toString()}`;
        }
      }
      //   } else {
      //     // if the defined keys are not present in the input
      //     return "Valid keys are not present";
      //   }
      //}
      //}
    }
    return true;
  } else {
    return true;
  }
};
