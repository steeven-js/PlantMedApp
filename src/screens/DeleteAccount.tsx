import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { text } from '../text';
import { alert } from '../alert';
import { hooks } from '../hooks';
import { utils } from '../utils';
import { custom } from '../custom';
import { theme } from '../constants';
import { components } from '../components';
import { actions } from '../store/actions';
import { useAuth } from '../hooks/useAuth';

const DeleteAccount: React.FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, deleteAccount } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      if (user) {
        const uid = user.uid;

        // Supprimer le document userProfile
        await firestore().collection('UserProfiles').doc(uid).delete();

        // Supprimer l'utilisateur
        await deleteAccount();

        dispatch(actions.logOut());
        alert.userDeleted();
        return;
      }

      alert.somethingWentWrong();
    } catch (error: any) {
      console.error("Erreur lors de la suppression du compte:", error);
      navigation.goBack();
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (): JSX.Element => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <custom.Image
          source={require('../assets/icons/11.png')}
          style={{
            aspectRatio: 123.39 / 120,
            height: utils.responsiveHeight(120),
            marginBottom: utils.responsiveHeight(14),
          }}
        />
        <text.H2
          numberOfLines={2}
          style={{
            marginBottom: utils.responsiveHeight(14),
          }}
        >
          Êtes-vous sûr de vouloir{'\n'}supprimer votre compte ?
        </text.H2>
        <text.T16>
          Cette action est irréversible.{'\n'}Toutes vos données seront perdues.
        </text.T16>
      </ScrollView>
    );
  };

  const renderButtons = (): JSX.Element => {
    return (
      <View style={{padding: 20}}>
        <components.Button
          title='annuler'
          containerStyle={{marginBottom: utils.responsiveHeight(14)}}
          touchableOpacityStyle={{backgroundColor: theme.colors.steelTeal}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <components.Button
          title='supprimer mon compte'
          loading={loading}
          touchableOpacityStyle={{backgroundColor: theme.colors.pastelMint}}
          onPress={() => {
            handleDeleteAccount();
          }}
          textStyle={{color: theme.colors.steelTeal}}
        />
      </View>
    );
  };

  return (
    <custom.SafeAreaView insets={['top', 'bottom']}>
      {renderContent()}
      {renderButtons()}
    </custom.SafeAreaView>
  );
};

export default DeleteAccount;