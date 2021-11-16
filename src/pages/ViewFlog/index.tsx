import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FlogData, FlogGeneratedData, FlogId } from 'types/flog';
import Loader from 'components/Loader';
import FlogForm from 'components/FlogForm';
import { useDispatch } from 'hooks/useDispatch';
import { useSelector } from 'hooks/useSelector';
import user from 'store/user';
import flog, { updateFlogItemRequest, getFlogItemRequest } from 'store/flog';

const ViewFlog = () => {
  const dispatch = useDispatch();
  let { id } = useParams<{ id: FlogId }>();
  const isAuthorized = useSelector(user.isAuthorized);
  const getFlogItem = useSelector(flog.getItem);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getFlogItemRequest({ id }));
    }
  }, [dispatch, id, isAuthorized]);

  const flogItem = getFlogItem(id);
  const handleFormSubmit = (data: Omit<FlogData, FlogGeneratedData>) => dispatch(updateFlogItemRequest({ id, data }));

  if (!flogItem) {
    return <Loader />;
  }

  return (
    <>
      <FlogForm data={flogItem} onSubmit={handleFormSubmit} />
    </>
  );
};

export default ViewFlog;
