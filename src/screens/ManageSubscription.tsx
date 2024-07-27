import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {custom} from '../custom';
import {components} from '../components';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {CONFIG, ENDPOINTS} from '../config';
import axios from 'axios';
import {text} from '../text';
import {getFormatDate} from '../utils/getFormatDate';
import { useSubscription } from '../hooks/revenueCat';

const ManageSubscription: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [loading, setLoading] = useState(false);
  const user = hooks.useAppSelector(state => state.userSlice.user);
  const isPrenium = hooks.useAppSelector(
    state => state.userSlice.user?.isPrenium,
  );

  const {expirationDate} = useSubscription();

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title={isPrenium ? 'Compte Premium' : 'Compte Gratuit'}
        goBackIcon={true}
      />
    );
  };

  const alreadyPrenium = () => {
    return Alert.alert('Success', 'Vous êtes déjà Prenium', [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
        },
      },
    ]);
  };

  const renderContent = (): JSX.Element => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <text.T16 style={{marginBottom: 20, textAlign: 'center'}}>
        {`Membre Premium jusqu'au ${expirationDate}`}
        </text.T16>
      </View>
    );
  };

  return (
    <custom.ImageBackground
      style={{flex: 1}}
      resizeMode='stretch'
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{backgroundColor: theme.colors.transparent}}
      >
        {renderHeader()}
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default ManageSubscription;
