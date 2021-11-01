import React from 'react';
import moment from 'moment';

import { FlogData } from 'types/flog';
import { DEFAULT_POSITION } from 'constants/application';
import FlogForm from 'components/FlogForm';
import { useDispatch } from 'hooks/useDispatch';
import { addFlogRequest } from 'store/flog';

const divisible = 10 * 60 * 1000; // ten minutes
const initialDate = moment(Math.floor(Date.now() / divisible) * divisible);
const initialData: FlogData = {
  'fishing_type': 'feeder',
  'position': DEFAULT_POSITION,
  'date': moment(initialDate),
  'time': [moment(initialDate).subtract(3 * 60 * 60 * 1000), moment(initialDate)],
  'weather': undefined,
  'water_temp': undefined,
  'bycatch': [],
  'bigfish_weight': undefined,
  'total_weight': undefined,
  'notes': '',
};

const AddFlog = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (data: FlogData) => dispatch(addFlogRequest({ data }));

  return (
    <FlogForm data={initialData} onSubmit={handleFormSubmit} />
  );
};

export default AddFlog;
