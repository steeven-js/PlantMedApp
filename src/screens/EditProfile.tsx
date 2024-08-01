import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

import {alert} from '../alert';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {validation} from '../validation';
import {components} from '../components';
import {useAuth} from '../hooks/useAuth';

const EditProfile: React.FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const {user, getAuthService} = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [location, setLocation] = useState<string>('');
  const [isEmailEditable, setIsEmailEditable] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDoc = await firestore()
          .collection('UserProfiles')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setName(userData?.displayName || user.displayName || '');
          setEmail(userData?.email || user.email || '');
          setLocation(userData?.location || '');
        }

        const service = await getAuthService();
        setIsEmailEditable(service !== 'google' && service !== 'apple');
      }
    };

    fetchUserProfile();
  }, [user, getAuthService]);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await firestore().collection('UserProfiles').doc(user.uid).set(
        {
          displayName: name,
          email: email,
          location: location,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );

      if (user.displayName !== name) {
        await user.updateProfile({displayName: name});
      }

      console.log('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title="Modifier les informations personnelles"
        goBackIcon={true}
      />
    );
  };

  const renderUserInfo = (): JSX.Element => {
    return (
      <components.UserData
        containerStyle={{marginBottom: utils.responsiveHeight(40)}}
      />
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <custom.InputField
          label="Nom"
          value={name}
          onChangeText={setName}
          placeholder="Name"
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          editable={isEmailEditable}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label="Localisation"
          value={location}
          onChangeText={setLocation}
          placeholder="Localisation"
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
      </View>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title="Enregistrer les modifications"
        loading={loading}
        onPress={handleUpdate}
        containerStyle={{paddingHorizontal: 20}}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <custom.ImageBackground
        style={{flex: 1}}
        resizeMode="stretch"
        source={require('../assets/bg/02.png')}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: utils.responsiveHeight(40),
          }}
          showsVerticalScrollIndicator={false}>
          {renderUserInfo()}
          {renderInputFields()}
          {renderButton()}
        </ScrollView>
      </custom.ImageBackground>
    );
  };

  return (
    <custom.SafeAreaView insets={['top', 'bottom']}>
      {renderHeader()}
      {renderContent()}
    </custom.SafeAreaView>
  );
};

export default EditProfile;
