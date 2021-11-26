import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    FLUSH,
    PAUSE,
    PERSIST, persistReducer, persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import { pokemonApi } from '../api/pokemon';
import { rootReducer, RootState } from '../reducers';

const persistConfig = {
    timeout: 0,
    key: 'prelive.root',
    storage: AsyncStorage,
};

export function configureAppStore(preloadedState: RootState) {
    const reducer = persistReducer<RootState>(persistConfig, rootReducer);

    const middleware = (gdm: CurriedGetDefaultMiddleware<any>) => {
        const middleware = gdm({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(pokemonApi.middleware);

        // Uncomment this if you want to add flipper + redux-flipper 
        // if (__DEV__) {
        //     const createDebugger = require('redux-flipper').default;
        //     middleware.push(createDebugger());
        // }

        return middleware;
    };


    const store = configureStore({
        reducer,
        middleware,
        preloadedState
    })
    const persistor = persistStore(store);

    // This one isn't working on web side, so we need to handle it if we want to target also web
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
        })
    }

    setupListeners(store.dispatch);

    return { store, persistor };
}