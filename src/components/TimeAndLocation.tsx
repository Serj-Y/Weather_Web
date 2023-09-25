import { formatToLocalTime } from "../utils/helpers";
import { WeatherType } from "../utils/weatherFormattedData";

export type TimeAndLocationPropsType = {
  weather: WeatherType;
  isFahrenheit: boolean;
};

export default function TimeAndLocation({ isFahrenheit, ...props }: TimeAndLocationPropsType) {
  const { name, country, localtime_epoch, tz_id } = props.weather;

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className=" text-white text-xl font-extralight">
          {formatToLocalTime(localtime_epoch, tz_id, undefined, isFahrenheit)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className=" text-white text-3xl font-medium">
          {name}, {country}
        </p>
      </div>
    </div>
  );
}
