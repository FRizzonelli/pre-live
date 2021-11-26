import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ScreenKeys } from "..";
import { Home } from "../../features/home";
import { Pokemon, pokemonOptions } from "../../features/pokemon";
import { AppNavigationParams } from "./AppNavigationParams";

const AppStack = createNativeStackNavigator<AppNavigationParams>();

function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={ScreenKeys.home}
        component={Home}
        options={{
          headerTitle: "Search a Pokèmon"
        }}
      />
      <AppStack.Screen
        name={ScreenKeys.pokemon}
        component={Pokemon}
        options={pokemonOptions}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
