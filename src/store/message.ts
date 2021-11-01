import { createAction } from '@reduxjs/toolkit';

export enum MESSAGE_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export type ShowMessageRequest = {
  type: MESSAGE_TYPE;
  message: string;
};

export const showMessageRequest = createAction<ShowMessageRequest>('message/showRequest');

