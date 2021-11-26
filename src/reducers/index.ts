import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { AppDispatch } from '../../App';
import { pokemonApi } from '../api/pokemon';

export const rootReducer = combineReducers({
    // Put your slices here
    [pokemonApi.reducerPath]: pokemonApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();