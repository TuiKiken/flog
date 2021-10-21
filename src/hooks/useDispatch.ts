import { useDispatch as useCoreDispatch } from 'react-redux'
import { store } from 'store';

type AppDispatch = typeof store.dispatch

export const useDispatch = () => useCoreDispatch<AppDispatch>()
