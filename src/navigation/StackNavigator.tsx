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
        name="TabNavigator"
        component={screens.TabNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="InfoSaved"
        component={screens.InfoSaved}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="LogOut"
        component={screens.LogOut}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DeleteAccount"
        component={screens.DeleteAccount}
        options={{headerShown: false}}
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
        name="Description"
        component={screens.Description}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="EditProfile"
        component={screens.EditProfile}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PlantMed"
        component={screens.PlantMed}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Symptom"
        component={screens.Symptom}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Filter"
        component={screens.Filter}
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
        name="Sources"
        component={screens.Sources}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Source"
        component={screens.Source}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PremiumActivated"
        component={screens.PremiumActivated}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MemberAccount"
        component={screens.MemberAccount}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Favorites"
        component={screens.PlantWishlist}
        options={{headerShown: false}}
      />
      {/* VERIFICATION */}
      <RootStack.Screen
        name="SendEmailOtp"
        component={screens.SendEmailOtp}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SendPhoneOtp"
        component={screens.SendPhoneOtp}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="VerifyEmail"
        component={screens.VerifyEmail}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="VerifyPhone"
        component={screens.VerifyPhone}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PhoneVerified"
        component={screens.PhoneVerified}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="EmailVerified"
        component={screens.EmailVerified}
        options={{headerShown: false}}
      />
      {/* Auth */}
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
