import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Pokemon as PokemonModel, PokemonSpecies } from "pokenode-ts";
import React, { FunctionComponent, useEffect } from "react";
import { FlatList, Image, SafeAreaView, Text } from "react-native";
import styled from "styled-components/native";
import { useGetPokemonSpeciesQuery } from "../../api/pokemon";
import { ScreenKeys } from "../../navigators";
import { AppScreenProps } from "../../navigators/AppNavigator/AppNavigationParams";
import { Colors } from "../../styles/color";

export interface IPokemonNavigationParams {
  pokemon: PokemonModel;
  species?: PokemonSpecies;
}

type Props = AppScreenProps<ScreenKeys.pokemon>;

// Should rename screen to avoid conflict with Pokemon model naming from `pokenode-ts`
const Pokemon: FunctionComponent<Props> = ({ route, navigation }) => {
  const { pokemon } = route.params;
  const { setParams } = navigation;

  const { data } = useGetPokemonSpeciesQuery({
    name: pokemon.species.name
  });

  useEffect(() => {
    if (data) {
      setParams({
        species: data
      });
    }
  }, [data]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: data?.color.name,
        justifyContent: "flex-start"
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: Colors.TEXT
        }}
      >
        {pokemon.name}
      </Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        resizeMode="contain"
        style={{ width: 250, height: 250 }}
      />
      <FlatList
        data={pokemon.moves}
        keyExtractor={(item, index) => `${item.move.name}${index}`}
        renderItem={({ item }) => <MoveItem>{item.move.name}</MoveItem>}
      />
    </SafeAreaView>
  );
};

export const pokemonOptions: (props: Props) => NativeStackNavigationOptions = ({
  route
}) => {
  const { pokemon, species } = route.params || {};

  return {
    headerTitle: pokemon.name,
    headerTintColor: species?.color.name
  };
};

const MoveItem = styled.Text`
  font-size: 16px;
  padding: 8px;
`;

export default Pokemon;
