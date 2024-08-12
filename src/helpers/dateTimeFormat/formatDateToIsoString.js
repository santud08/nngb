import moment from "moment";

export const formatDateToIsoString = (date, format = "YYYY-MM-DDTHH:mm:ss.sssZ") => {
  return moment(date).format(format);
};
