import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStack } from '@src/navigation/RootStack';

import { screens } from '@src/screens';
import { RootStackParamList } from '@src/types/RootStackParamList';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => useNavigation<Navigation>();

const StackNavigator: React.FC = () => (
    <RootStack.Navigator initialRouteName="TabNavigator">
      <RootStack.Screen
        component={screens.TabNavigator}
        name="TabNavigator"
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        component={screens.Plant}
        name="Plant"
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        component={screens.Symptom}
        name="Symptom"
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SearchPlant"
        component={screens.SearchPlant}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SearchSymptom"
        component={screens.SearchSymptom}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Premium"
        component={screens.Premium}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PrivacyPolicy"
        component={screens.PrivacyPolicy}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="TermsOfUse"
        component={screens.TermsOfUse}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Source"
        component={screens.Source}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );

export default StackNavigator;
