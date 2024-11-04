import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/types/RootStackParamList';

export const RootStack = createNativeStackNavigator<RootStackParamList>();
