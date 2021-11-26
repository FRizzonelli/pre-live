import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  Text
} from "react-native";
import styled from "styled-components/native";
import { useLazyGetPokemonQuery } from "../../api/pokemon";
import { ScreenKeys } from "../../navigators";
import { AppScreenProps } from "../../navigators/AppNavigator/AppNavigationParams";
import { Colors } from "../../styles/color";

export interface IHomeNavigationParams {}

type Props = AppScreenProps<ScreenKeys.home>;

const Home: FunctionComponent<Props> = ({ navigation }) => {
  const { navigate } = navigation;

  const [name, setName] = useState<string>();

  const [
    searchPokemon,
    { data: pokemon, isLoading, error }
  ] = useLazyGetPokemonQuery();

  useEffect(() => {
    if (pokemon) {
      navigate(ScreenKeys.pokemon, {
        pokemon
      });
    }
  }, [pokemon]);

  const handlePokemonSearchPressed = () => {
    if (name) {
      if (name !== pokemon?.name) {
        searchPokemon({
          name
        });
      } else {
        navigate(ScreenKeys.pokemon, {
          pokemon
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{ flex: 1 }}
        contentContainerStyle={{ justifyContent: "flex-start" }}
      >
        {isLoading && <ActivityIndicator size="large" />}
        <Text>Type a pokemon name and search</Text>
        <StyledTextInput
          color={Colors.TEXT}
          value={name}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => setName(text)}
        />
        <Button title="Find Pokèmon" onPress={handlePokemonSearchPressed} />
      </ScrollView>
    </SafeAreaView>
  );
};

const StyledTextInput = styled.TextInput.attrs(
  (props: { color: string }) => props
)`
  font-size: 18px;
  color: ${props => props.color};
  height: 40px;
  width: 100%;
  background-color: ${Colors.WHITE_100};
  padding-vertical: 0px;
`;

export default Home;
