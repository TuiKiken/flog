import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';

import { Coordinates } from 'types/map';
import { HourlyWeather } from 'types/weather';

export interface FlogData {
  'fishing_type': 'feeder' | 'spinning'| 'rode';
  'position': Coordinates;
  'date': moment.Moment | null;
  'time': RangeValue<moment.Moment>;
  'weather': HourlyWeather[];
  'water_temp': number | undefined;
  'bycatch': string[];
  'bigfish_weight': number;
  'total_weight': number;
  'notes': string;
}
