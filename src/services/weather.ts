import { WEATHER_API_KEY } from 'configs';
import { HourlyWeather } from 'types/weather';

interface ResponseWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind_deg: number;
  wind_speed: number;
}

interface ResponseCurrentWeather extends ResponseWeather {
  sunrise: number;
  sunset: number;
  uvi: number
  wind_gust: number;
}

interface ResponseHourlyWeather extends ResponseWeather {}

interface FetchResponse {
  current: ResponseCurrentWeather;
  hourly: ResponseHourlyWeather[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

const getWeatherUrl = (latitude: number, longitude: number, time: number) => {
  return `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${time}&appid=${WEATHER_API_KEY}&units=metric`;
}

const fetchHourlyWeather = async (latitude: number, longitude: number, time: number) => {
  const response = await fetch(getWeatherUrl(latitude, longitude, time));

  if (!response.ok) {
    // TODO: error message
  }

  const data: FetchResponse = await response.json();

  return data.hourly.map(weather => ({
    date: weather.dt,
    timezone: data.timezone,
    timezone_offset: data.timezone_offset,
    temperature: weather.temp,
    temperatureFeelsLike: weather.feels_like,
    pressure: weather.pressure,
    visibility: weather.visibility,
    clouds: weather.clouds,
    humidity: weather.humidity,
    dewPoint: weather.dew_point,
    windSpeed: weather.wind_speed,
    windDeg: weather.wind_deg,
  } as HourlyWeather));
}

export const getWeather = async (latitude: number, longitude: number, time: number) => {
  const response = await Promise.all([
    fetchHourlyWeather(latitude, longitude, time - 2 * 3600 * 24), // 2 days ago
    fetchHourlyWeather(latitude, longitude, time - 3600 * 24), // 1 day ago
    fetchHourlyWeather(latitude, longitude, time), // today
  ]);

  return response.flat();
};

export default getWeather;
