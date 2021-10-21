import React from 'react';
import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { ReferenceLine, ReferenceArea, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { HourlyWeather } from 'types/weather';

export interface WeatherChartProps {
  weather: HourlyWeather[];
  time: RangeValue<moment.Moment>;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ weather, time }) => {
  const newDayPoints = weather.reduce<number[]>((acc, item) => {
    if ((item.date + item.timezone_offset) % 86400 === 0) {
      return [...acc, item.date];
    }

    return acc;
  }, []);

  const fromTime = time?.[0]?.clone().startOf('hour').unix();
  const toTime = weather.find(i => i.date === time?.[1]?.clone().add(1, 'hours').startOf('hour').unix())
    ? time?.[1]?.clone().add(1, 'hours').startOf('hour').unix()
    : time?.[1]?.clone().startOf('hour').unix();

  return (
    <ResponsiveContainer height={200}>
      <LineChart data={weather}>
        <XAxis
          dataKey="date"
          tickFormatter={value => moment(new Date(value * 1000)).format('HH:mm')}
          minTickGap={0}
          angle={-10}
        />
        <YAxis hide={true} yAxisId="temperature-y" domain={['dataMin', 'dataMax']} unit={' °C'} />
        <YAxis hide={true} yAxisId="pressure-y" domain={['dataMin', 'dataMax']} unit={' hPa'} />

        <Line yAxisId="temperature-y" type="monotone" dataKey="temperature" stroke="#8884d8" dot={{ r: 2 }} unit={' °C'} />
        <Line yAxisId="pressure-y" type="monotone" dataKey="pressure" stroke="#F4BD3E" dot={{ r: 2 }} unit={' hPa'} />

        {newDayPoints.map(date => (
          <ReferenceLine key={date} yAxisId="temperature-y" x={`${date}`} stroke="#B0B0B0" strokeDasharray="5 10" />
        ))}

        {time !== null && time[0] !== null && time[1] !== null && (
          <ReferenceArea
            yAxisId="temperature-y"
            x1={`${fromTime}`}
            x2={`${toTime}`}
            isFront={true} />
        )}

        <Tooltip labelFormatter={(value) => moment(Number(value) * 1000).format('D MMM YYYY(dddd) HH:mm')} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeatherChart;
