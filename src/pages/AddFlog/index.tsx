import React from 'react';
import dayjs from 'dayjs';

import { FlogData, FlogGeneratedData } from 'types/flog';
import { DEFAULT_POSITION } from 'constants/application';
import FlogForm from 'components/FlogForm';
import { useDispatch } from 'hooks/useDispatch';
import { addFlogItemRequest } from 'store/flog';

const divisible = 10 * 60 * 1000; // ten minutes
const initialDate = dayjs(Math.floor(Date.now() / divisible) * divisible);
const initialData: Omit<FlogData, FlogGeneratedData> = {
  'fishing_type': 'feeder',
  'position': { ...DEFAULT_POSITION, geohash: '' },
  'date': dayjs(initialDate).toISOString(),
  'time': [dayjs(initialDate).subtract(3 * 60 * 60 * 1000).toISOString(), dayjs(initialDate).toISOString()],
  'weather': null,
  'water_temp': null,
  'bycatch': [],
  'bigfish_weight': null,
  'total_weight': null,
  'notes': '',
  'public': false,
};

const AddFlog = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (data: Omit<FlogData, FlogGeneratedData>) => dispatch(addFlogItemRequest({ data }));

  return (
    <FlogForm data={initialData} onSubmit={handleFormSubmit} />
  );
};

export default AddFlog;
