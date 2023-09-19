import { DateTime } from "luxon";

export const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLLL yyyy' | Local time: 'HH:mm"
): string => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};
 