import { TypedUseSelectorHook, useSelector as useCoreSelector } from 'react-redux';
import { RootState } from 'store';

export const useSelector: TypedUseSelectorHook<RootState> = useCoreSelector;
