import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorKeys } from '..';

export type RootScreenProps<T extends keyof RootNavigationParams> = {
    navigation: NativeStackNavigationProp<RootNavigationParams, T>;
    route: RouteProp<RootNavigationParams, T>;
};

export type RootNavigationParams = {
    [NavigatorKeys.app]: undefined;
};
