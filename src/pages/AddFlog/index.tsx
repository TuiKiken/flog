import React, { useEffect, useState } from 'react';
import { Form, Radio, DatePicker, Input, TimePicker, Button, Select, Space, Upload, message } from 'antd';
import { ExportOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { FlogData } from 'types/flog';
import { DEFAULT_POSITION, FISH_LIST } from 'constants/application';
import { Map } from 'components/Map';
import { WeatherChart } from 'components/WeatherChart';
import getWeather from 'services/weather';
import { usePosition } from 'hooks/usePosition';
import './index.css';



const AddFlog = () => {
  // const [center, setCenter] = useState(DEFAULT_POSITION);
  // const [date, setDate] = useState<moment.Moment | null>(moment(new Date()));
  // const [time, setTime] = useState<RangeValue<moment.Moment>>([moment(new Date()).subtract(3 * 60 * 60 * 1000), moment(new Date())]);
  // const [weather, setWeather] = useState<HourlyWeather[]>([]);

  const [data, setData] = useState<FlogData>({
    'fishing_type': 'feeder',
    'position': DEFAULT_POSITION,
    'date': moment(new Date()),
    'time': [moment(new Date()).subtract(3 * 60 * 60 * 1000), moment(new Date())],
    'weather': [],
    'water_temp': undefined,
    'bycatch': [],
    'bigfish_weight': 0,
    'total_weight': 0,
    'notes': '',
  });
  const userPosition = usePosition();

  useEffect(() => {
    if (data.position === DEFAULT_POSITION && userPosition !== undefined) {
      setData({ ...data, 'position': userPosition })
    }
  }, [data, userPosition]);

  const handleFillWeather = async () => {
    if (data.date === null) {
      message.error(`Необходимо указать дату.`);
      return;
    }

    const weather = await getWeather(data.position.latitude, data.position.longitude, data.date.unix());
    setData({ ...data, weather });
  };

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="Вид рыбалки">
        <Radio.Group name="fishing_type" defaultValue="feeder">
          <Radio.Button value="feeder">Фидел</Radio.Button>
          <Radio.Button value="spinning">Спиннинг</Radio.Button>
          <Radio.Button value="rod">Удочка</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Место" >
        <Map
          mapCenter={data.position}
          userPosition={userPosition}
          onMapCenterChange={(mapCenter) => setData({ ...data, position: mapCenter })} />
      </Form.Item>

      <Form.Item label="Дата">
        <Space>
          <DatePicker name="date" value={data.date} onChange={(date) => setData({ ...data, date })} />
          <TimePicker.RangePicker name="time" format={'HH:mm'} minuteStep={10}  defaultValue={data.time} onChange={(time) => setData({ ...data, time })} />
          <Button type="primary" icon={<ExportOutlined />} onClick={handleFillWeather}>Заполнить погоду</Button>
        </Space>
      </Form.Item>

      <Form.Item label="Погода">
        <WeatherChart weather={data.weather} time={data.time} />
      </Form.Item>

      <Form.Item label="Температура воды">
        <Input
          addonAfter="°C"
          placeholder="Температура воды в день рыбалки"
          value={data.water_temp}
          onChange={(e) => setData({ ...data, water_temp: Number(e.target.value) })} />
      </Form.Item>

      <Form.Item label="Прилов">
        <Select
          mode="multiple"
          allowClear
          placeholder="Укажите основную рыбу прилова"
          optionFilterProp="children"
          // onChange={handleChange}
        >
          {FISH_LIST.map((i) => (<Select.Option key={i.id} value={i.id}>{i.title}</Select.Option>))}
        </Select>
      </Form.Item>

      <Form.Item label="Вес бигфиша">
        <Input name="bigfish_weight" addonAfter="грамм" />
      </Form.Item>

      <Form.Item label="Общий вес">
        <Input name="total_weight" addonAfter="грамм" />
      </Form.Item>

      <Form.Item label="Фотоотчёт">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          className="upload-list-inline"
          beforeUpload={file => {
            const allowedType = ['image/png', 'image/jpeg', 'image/pjpeg'].includes(file.type);

            if (!allowedType) {
              message.error(`Файл ${file.name} имеет недопустимый формат. Допустимые форматы – png и jpeg.`);
            }
              return allowedType;
            }
          }
        >
          <Button icon={<UploadOutlined />}>Добавить фотографию</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Коментарий">
        <Input.TextArea name="notes" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddFlog;
