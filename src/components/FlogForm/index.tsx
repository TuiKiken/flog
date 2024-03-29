import React, { FC, useEffect } from 'react';
import { Button, Form, Input, message, Radio, Select, Space, Checkbox } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { geohashForLocation } from 'geofire-common';
import dayjs from 'dayjs';

import { FlogData, FlogFormData, FlogGeneratedData } from 'types/flog';
import { DEFAULT_POSITION, FISH_LIST } from 'constants/application';
import { Map } from 'components/Map';
import { WeatherChart } from 'components/WeatherChart';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';
import getWeather from 'services/weather';
import { usePosition } from 'hooks/usePosition';
import './index.css';

interface FlogFormProps {
  data: Omit<FlogData, FlogGeneratedData>;
  onSubmit: (data: Omit<FlogData, FlogGeneratedData>) => void;
}

export const convertToFormData = (data: Omit<FlogData, FlogGeneratedData>): FlogFormData => {
  return {
    ...data,
    date: dayjs(data.date),
    time: [dayjs(data.time[0]), dayjs(data.time[1])],
    water_temp: data.water_temp !== null ? String(data.water_temp) : null,
    bigfish_weight: data.bigfish_weight !== null ? String(data.bigfish_weight) : null,
    total_weight: data.total_weight !== null ? String(data.total_weight) : null,
  }
};

export const convertFromFormData = (data: FlogFormData): Omit<FlogData, FlogGeneratedData> => {
  return {
    ...data,
    position: {
      ...data.position,
      geohash: geohashForLocation([data.position.latitude, data.position.longitude]),
    },
    date: data.date?.toISOString() ?? null,
    time: [
      data.time?.[0]?.toISOString() ?? null,
      data.time?.[1]?.toISOString() ?? null,
    ],
    water_temp: data.water_temp ? Number(data.water_temp) : null,
    bigfish_weight: Number(data.bigfish_weight),
    total_weight: Number(data.total_weight),
  };
};

const FlogForm: FC<FlogFormProps> = ({ data, onSubmit }) => {
  const [form] = Form.useForm();
  const userPosition = usePosition();

  useEffect(() => {
    const position = form.getFieldValue('position');
    const isDefaultPosition = position.latitude === DEFAULT_POSITION.latitude && position.longitude === DEFAULT_POSITION.longitude;

    if (isDefaultPosition && userPosition !== undefined) {
      form.setFieldsValue({
        position: {
          latitude: userPosition.latitude,
          longitude: userPosition.longitude
        }
      });
    }
  }, [form, userPosition]);

  const handleFillWeather = async () => {
    const date = form.getFieldValue('date');
    const position = form.getFieldValue('position');

    if (date === null) {
      message.error('Необходимо указать дату');
      return;
    }

    const weather = await getWeather(position.latitude, position.longitude, date.unix());
    form.setFieldsValue({ weather });
  };
  const handleSubmit = (data: FlogFormData) => {
    onSubmit(convertFromFormData(data));
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="add_flog"
      form={form}
      initialValues={convertToFormData(data)}
      onFinish={handleSubmit}
    >
      <Form.Item label="Вид рыбалки" name="fishing_type">
        <Radio.Group>
          <Radio.Button value="feeder">Фидер</Radio.Button>
          <Radio.Button value="spinning">Спиннинг</Radio.Button>
          <Radio.Button value="rod">Удочка</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, current) => prev.position !== current.position}
      >
        {({ getFieldValue }) => (
          <Form.Item
            label="Место"
            name="position"
          >
            <Map
              mapCenter={getFieldValue('position')}
              userPosition={userPosition}
              onMapCenterChange={(mapCenter) => form.setFieldsValue({ position: mapCenter })}/>
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item label="Дата">
        <Space>
          <Form.Item noStyle name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item noStyle name="time">
            <TimePicker format={'HH:mm'} minuteStep={10} />
          </Form.Item>
          <Button type="primary" icon={<ExportOutlined />} onClick={handleFillWeather}>Заполнить погоду</Button>
        </Space>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, current) => prev.weather !== current.weather || prev.time !== current.time}
      >
        {({ getFieldValue }) => (
          <Form.Item
            label="Погода"
            name="weather"
            rules={[{ required: true, message: 'Необходимо заполнить погоду' }]}
          >
            {
              getFieldValue('weather') ? (
                <WeatherChart weather={getFieldValue('weather')} time={getFieldValue('time')} />
              ) : (
                <div>Нет данных о погоде</div>
              )
            }
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item label="Температура воды" name="water_temp">
        <Input
          type="number"
          addonAfter="°C"
          placeholder="Температура воды в день рыбалки"
        />
      </Form.Item>

      <Form.Item label="Прилов" name="bycatch">
        <Select
          mode="multiple"
          allowClear
          placeholder="Укажите основную рыбу прилова"
          optionFilterProp="children"
        >
          {FISH_LIST.map((i) => (<Select.Option key={i.id} value={i.id}>{i.title}</Select.Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Вес бигфиша"
        name="bigfish_weight"
        rules={[{ required: true, message: 'Укажите вес самой большой рыбы из улова' }]}
      >
        <Input type="number" addonAfter="грамм" />
      </Form.Item>

      <Form.Item
        label="Общий вес"
        name="total_weight"
        rules={[{ required: true, message: 'Укажите общий вес улова' }]}
      >
        <Input type="number" addonAfter="грамм" />
      </Form.Item>

      {/*/!* @TODO: should be added in future release *!/*/}
      {/*/!*<Form.Item label="Фотоотчёт">*!/*/}
      {/*/!*  <Upload*!/*/}
      {/*/!*    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*!/*/}
      {/*/!*    listType="picture"*!/*/}
      {/*/!*    className="upload-list-inline"*!/*/}
      {/*/!*    beforeUpload={file => {*!/*/}
      {/*/!*      const allowedType = ['image/png', 'image/jpeg', 'image/pjpeg'].includes(file.type);*!/*/}

      {/*/!*      if (!allowedType) {*!/*/}
      {/*/!*        message.error(`Файл ${file.name} имеет недопустимый формат. Допустимые форматы – png и jpeg.`);*!/*/}
      {/*/!*      }*!/*/}
      {/*/!*        return allowedType;*!/*/}
      {/*/!*      }*!/*/}
      {/*/!*    }*!/*/}
      {/*/!*  >*!/*/}
      {/*/!*    <Button icon={<UploadOutlined />}>Добавить фотографию</Button>*!/*/}
      {/*/!*  </Upload>*!/*/}
      {/*/!*</Form.Item>*!/*/}

      <Form.Item label="Коментарий" name="notes">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Публичный отчёт" name="public" valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FlogForm;
