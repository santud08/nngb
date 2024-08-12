import * as cron from "node-cron";
import * as schedule from "./schedule/index.js";

export const schedulers = () => {
  // cron.schedule("* 0 0 * * *", () => {
  //   console.log("cron runs in each day");
  // });
  //cron.schedule("1 * * * * *", () => {
  //console.log("cron runs in each 1 min");
  //schedule.updateNews("movie");
  // schedule.updateNews("tv_show");
  // schedule.getTvNetworkList();
  // schedule.getTmdbImportData();
  //});
  //test
  // cron.schedule("* */20 * * * *", () => {
  //   console.log("cron runs in each 20 min");
  //   schedule.getTvNetworkList();
  // });
  // cron.schedule("0 */5 * * * *", () => {
  //   console.log("cron runs in each 5 min");
  //   //schedule.getTmdbImportData();
  // });
  // cron.schedule("0 0 */1 * * *", () => {
  //   console.log("cron runs in each 1 hour");
  //   //schedule.updateNews("movie");
  //   //schedule.updateNews("tv_show");
  // });
  // cron.schedule(
  //   "00 00 08 * * *",
  //   () => {
  //     console.log("cron runs in each day 8 AM UTC");
  //     //schedule.getTvNetworkList();
  //   },
  //   { timezone: "Etc/UTC" },
  // );
};
