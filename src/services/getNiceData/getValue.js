export const getValue = (plaindata, key) => {
  var arrData = plaindata.split(":");
  var value = "";
  for (let i in arrData) {
    var item = arrData[i];
    if (item.indexOf(key) == 0) {
      var valLen = parseInt(item.replace(key, ""));
      arrData[i++];
      value = arrData[i].substr(0, valLen);
      break;
    }
  }
  return value;
};
