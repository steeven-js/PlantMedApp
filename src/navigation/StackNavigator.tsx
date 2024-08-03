import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {screens} from '../screens';
import {RootStack} from './RootStack';
import {RootStackParamList} from '../types/RootStackParamList';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  return useNavigation<Navigation>();
};

const StackNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="SignIn"
        component={screens.SignIn}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SignUp"
        component={screens.SignUp}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="NewPassword"
        component={screens.NewPassword}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ForgotPasswordSentEmail"
        component={screens.ForgotPasswordSentEmail}
        options={{headerShown: false}}
      />
      {/* VERIFICATION */}
      <RootStack.Screen
        name="SendEmailOtpForgot"
        component={screens.SendEmailOtpForgot}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="VerifyEmailForgot"
        component={screens.VerifyEmailForgot}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
