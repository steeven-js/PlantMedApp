
import { View, ScrollView, Linking, Platform } from 'react-native';

import { hooks } from '@src/hooks';
import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { svg } from '@src/assets/svg';
import { components } from '@src/components';

const Profile: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const openAppleEULA = () => {
    Linking.openURL('https://www.apple.com/legal/internet-services/itunes/chfr/terms.html');
  };

  const renderMenu = (): JSX.Element => {
    return (
      <ScrollView
        style={{
          flex: 1,
          // justifyContent: 'space-between',
          paddingLeft: 20,
        }}
      >
        <View>
          <components.ProfileItem
            title={'Compte gratuit'}
            // onPress={() => {
            //   navigation.navigate('MemberAccount');
            // }}
            icon={<svg.UserSvg />}
            goNavigation={true}
            containerStyle={{ marginBottom: utils.responsiveHeight(10) }}
          />
          <components.ProfileItem
            title="Conditions d'utilisation"
            onPress={() => {
              navigation.navigate('TermsOfUse');
            }}
            icon={<svg.FileTextSvg />}
            goNavigation={true}
            containerStyle={{ marginBottom: utils.responsiveHeight(6) }}
          />
          <components.ProfileItem
            title="Politique de confidentialité"
            onPress={() => {
              navigation.navigate('PrivacyPolicy');
            }}
            icon={<svg.FileTextSvg />}
            goNavigation={true}
            containerStyle={{ marginBottom: utils.responsiveHeight(6) }}
          />
          <components.ProfileItem
            title={
              Platform.OS === 'ios'
                ? "Conditions d'utilisation Apple"
                : "Conditions d'utilisation Google"
            }
            onPress={Platform.OS === 'ios' ? openAppleEULA : () => {}}
            icon={<svg.FileTextSvg />}
            goNavigation={true}
            containerStyle={{ marginBottom: utils.responsiveHeight(6) }}
          />
        </View>
      </ScrollView>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <custom.ImageBackground
        style={{ flex: 1 }}
        resizeMode="stretch"
        source={require('../../assets/bg/02.png')}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: utils.responsiveHeight(50),
            paddingBottom: utils.responsiveHeight(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          {renderMenu()}
        </ScrollView>
      </custom.ImageBackground>
    );
  };

  return renderContent();
};

export default Profile;
