import { SagaIterator } from '@redux-saga/types';
import { PayloadAction } from '@reduxjs/toolkit';

export type Saga<Payload = null> = Payload extends object
  ? ({ payload }: PayloadAction<Payload>) => SagaIterator
  : () => SagaIterator;
