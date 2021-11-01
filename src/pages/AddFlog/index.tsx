import React from 'react';
import dayjs from 'dayjs';

import { FlogFormData } from 'types/flog';
import { DEFAULT_POSITION } from 'constants/application';
import FlogForm from 'components/FlogForm';
import { useDispatch } from 'hooks/useDispatch';
import { addFlogRequest } from 'store/flog';

const divisible = 10 * 60 * 1000; // ten minutes
const initialDate = dayjs(Math.floor(Date.now() / divisible) * divisible);
const initialData: FlogFormData = {
  'fishing_type': 'feeder',
  'position': DEFAULT_POSITION,
  'date': dayjs(initialDate),
  'time': [dayjs(initialDate).subtract(3 * 60 * 60 * 1000), dayjs(initialDate)],
  'weather': null,
  'water_temp': null,
  'bycatch': [],
  'bigfish_weight': null,
  'total_weight': null,
  'notes': '',
};

const AddFlog = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (data: FlogFormData) => dispatch(addFlogRequest({ data }));

  return (
    <FlogForm data={initialData} onSubmit={handleFormSubmit} />
  );
};

export default AddFlog;
