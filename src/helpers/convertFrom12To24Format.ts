import { DateTime } from "luxon";

export const convertFrom12To24Format = (time12: string, isFahrenheit: boolean) => {
  if (isFahrenheit) {
    return time12
  } else {
      return DateTime.fromFormat(time12, "hh:mm a").toFormat("HH:mm")
  }
};


// export const convertFrom12To24Format = (time12: any) => {
//   const [sHours, minutes, period] = time12?.match(/([0-9]{1,2}):([0-9]{2}) (AM|PM)/)?.slice(1);
//   const PM = period === 'PM';
//   const hours = (+sHours % 12) + (PM ? 12 : 0);

//   return `${('0' + hours).slice(-2)}:${minutes}`;
// };
