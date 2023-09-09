import { DateTime } from "luxon";

export const formatToLocalTime = (secs: any, zone: any, format = "cccc, dd LLLL yyyy' | Local time: 'HH:mm") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
