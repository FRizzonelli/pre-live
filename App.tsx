import { NavigationContainerRef } from "@react-navigation/native";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { pokemonApi } from "./src/api/pokemon";
import { RootNavigator } from "./src/navigators/RootNavigator";
import { configureAppStore } from "./src/reducers/store";

// Redux configuration and setup with initialStates
const { store, persistor } = configureAppStore({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [pokemonApi.reducerPath]: undefined
});

export type AppDispatch = typeof store.dispatch;

export default function App() {
  const navigatorRef = useRef<NavigationContainerRef<{}>>(null);

  return (
    <Provider store={store}>
      <PersistGate loading={undefined} persistor={persistor}>
        <RootNavigator ref={navigatorRef} />
      </PersistGate>
    </Provider>
  );
}
