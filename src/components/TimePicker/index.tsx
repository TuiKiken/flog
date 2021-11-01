import { Dayjs } from 'dayjs';
import * as React from 'react';
import DatePicker from 'components/DatePicker';
import { RangePickerTimeProps } from 'antd/es/date-picker/generatePicker';

export interface TimePickerProps extends Omit<RangePickerTimeProps<Dayjs>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker.RangePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;
