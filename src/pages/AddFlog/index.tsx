import React, { useEffect } from 'react';
import { Form, Radio, DatePicker, Input, TimePicker, Button, Select, Space, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import moment from 'moment';

import { FlogData } from 'types/flog';
import { DEFAULT_POSITION, FISH_LIST } from 'constants/application';
import { Map } from 'components/Map';
import { WeatherChart } from 'components/WeatherChart';
import getWeather from 'services/weather';
import { usePosition } from 'hooks/usePosition';
import './index.css';

const initialData: FlogData = {
  'fishing_type': 'feeder',
  'position': DEFAULT_POSITION,
  'date': moment(new Date()),
  'time': [moment(new Date()).subtract(3 * 60 * 60 * 1000), moment(new Date())],
  'weather': undefined,
  'water_temp': undefined,
  'bycatch': [],
  'bigfish_weight': undefined,
  'total_weight': undefined,
  'notes': '',
};

const AddFlog = () => {
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
      message.error(`Необходимо указать дату.`);
      return;
    }

    const weather = await getWeather(position.latitude, position.longitude, date.unix());
    form.setFieldsValue({ weather });
  };

  const handleFormSubmit = () => {
    console.warn(form.getFieldsValue());
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="add_flog"
      form={form}
      initialValues={initialData}
      onFinish={handleFormSubmit}
    >
      <Form.Item label="Вид рыбалки" name="fishing_type">
        <Radio.Group>
          <Radio.Button value="feeder">Фидел</Radio.Button>
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
            <TimePicker.RangePicker format={'HH:mm'} minuteStep={10} />
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
        <Input addonAfter="грамм" />
      </Form.Item>

      <Form.Item
        label="Общий вес"
        name="total_weight"
        rules={[{ required: true, message: 'Укажите общий вес улова' }]}
      >
        <Input addonAfter="грамм" />
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

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddFlog;
