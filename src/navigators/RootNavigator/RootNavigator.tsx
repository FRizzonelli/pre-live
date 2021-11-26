import {
  NavigationContainer,
  NavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { ForwardedRef, forwardRef, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigatorKeys } from "..";
import { AppNavigator } from "../AppNavigator";
import { RootNavigationParams } from "./RootNavigationParams";

interface IRootNavigatorProps {}

const Stack = createNativeStackNavigator<RootNavigationParams>();

function RootNavigator(
  _props: IRootNavigatorProps,
  ref: ForwardedRef<NavigationContainerRef<{}>>
) {
  const routeNameRef = useRef<string>();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={ref}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name={NavigatorKeys.app} component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default forwardRef(RootNavigator);
