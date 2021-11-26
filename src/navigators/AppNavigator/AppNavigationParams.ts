import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenKeys } from '..';
import { IHomeNavigationParams } from '../../features/home';
import { IPokemonNavigationParams } from '../../features/pokemon';

export type AppScreenProps<T extends keyof AppNavigationParams> = {
    navigation: NativeStackNavigationProp<AppNavigationParams, T>;
    route: RouteProp<AppNavigationParams, T>;
};

export type AppNavigationParams = {
    [ScreenKeys.home]: IHomeNavigationParams;
    [ScreenKeys.pokemon]: IPokemonNavigationParams;
};
