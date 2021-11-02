import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { ReferenceLine, ReferenceArea, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { HourlyWeather } from 'types/weather';

export interface WeatherChartProps {
  weather: HourlyWeather[];
  time: RangeValue<Dayjs>;
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
          tickFormatter={value => dayjs(new Date(value * 1000)).format('HH:mm')}
          minTickGap={0}
          angle={-10}
        />
        <YAxis hide={true} yAxisId="temperature-y" domain={['dataMin', 'dataMax']} unit={' °C'} />
        <YAxis hide={true} yAxisId="pressure-y" domain={['dataMin', 'dataMax']} unit={' hPa'} />
        <YAxis hide={true} yAxisId="humidity-y" domain={['dataMin', 'dataMax']} unit={' hPa'} />

        <Line yAxisId="temperature-y" type="monotone" name="Температура" dataKey="temperature" stroke="#ff4d4f" dot={{ r: 1 }} unit={' °C'} />
        <Line yAxisId="pressure-y" type="monotone" name="Давление" dataKey="pressure" stroke="#ffd666" dot={{ r: 1 }} unit={' hPa'} />
        <Line yAxisId="humidity-y" type="monotone" name="Влажность" dataKey="humidity" stroke="#69c0ff" dot={{ r: 1 }} unit={' hPa'} />

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

        <Tooltip labelFormatter={(value) => dayjs(Number(value) * 1000).format('D MMM YYYY(dddd) HH:mm')} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeatherChart;
