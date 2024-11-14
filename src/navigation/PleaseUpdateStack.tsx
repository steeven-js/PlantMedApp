import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {screens} from '../screens';
import {RootStack} from './RootStack';
import {RootStackParamList} from '../types/RootStackParamList';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  return useNavigation<Navigation>();
};

const PleaseUpdateStack: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name='PleaseUpdate'
        component={screens.PleaseUpdate}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default PleaseUpdateStack;
