import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../app/store';

// Este hook se comporta igual que useSelector, pero ya trae el tipado de RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;