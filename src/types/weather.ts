export interface HourlyWeather {
  date: number;
  timezone: string;
  timezone_offset: number;
  temperature: number;
  temperatureFeelsLike: number;
  pressure: number;
  visibility: number;
  clouds: number;
  humidity: number;
  dewPoint: number;
  windSpeed: number;
  windDeg: number;
}
