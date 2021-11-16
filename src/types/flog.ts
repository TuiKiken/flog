import { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';

import { Coordinates } from 'types/map';
import { HourlyWeather } from 'types/weather';

export type FlogId = string;

export interface FlogData {
  id: FlogId;
  fishing_type: 'feeder' | 'spinning'| 'rode';
  position: Coordinates & { geohash: string; };
  date: string | null;
  time: [string | null, string | null];
  weather: HourlyWeather[] | null;
  water_temp: number | null;
  bycatch: string[];
  bigfish_weight: number | null;
  total_weight: number | null;
  notes: string;
  public: boolean;
  author_uid: string;
}

export interface FlogFormData {
  fishing_type: 'feeder' | 'spinning'| 'rode';
  position: Coordinates;
  date: Dayjs | null;
  time: RangeValue<Dayjs>;
  weather: HourlyWeather[] | null;
  water_temp: string | null;
  bycatch: string[];
  bigfish_weight: string | null;
  total_weight: string | null;
  notes: string;
  public: boolean;
}

export type FlogGeneratedData = 'id' | 'author_uid';
