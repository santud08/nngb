import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import ko from "dayjs/locale/ko.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

// Set the timezone to the desired location (e.g., Asia/Seoul for Korean time)
dayjs.tz.setDefault("Asia/Seoul");
export const getKoreanCurrentDateTime = async () => {
  const nDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });

  // Parse the date string back into a Date object
  const dateObject = new Date(nDate);

  // Format the date using dayjs
  const formattedDate = dayjs(dateObject).format("YYYY-MM-DD HH:mm:ss");
  //console.log(formattedDate);
  return formattedDate;
};
