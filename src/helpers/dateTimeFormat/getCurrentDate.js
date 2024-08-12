import dayjs from "dayjs";

export const getCurrentDate = async (format = "YYYY-MM-DD") => {
  const dateString = dayjs().format(format);
  return dateString;
};
