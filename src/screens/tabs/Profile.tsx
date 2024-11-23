import { View, ScrollView, Linking, Platform } from 'react-native';
import { hooks } from '@src/hooks';
import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { svg } from '@src/assets/svg';
import { components } from '@src/components';
import { useAppSelector } from '@src/store';

const Profile: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const userPremium = useAppSelector(state => state.premiumSlice.premium);

  const menuItems = [
    {
      title: userPremium ? 'Membre Premium' : 'Membre gratuit',
      icon: <svg.UserSvg />,
      onPress: () => navigation.navigate('MemberAccount'),
      marginBottom: utils.responsiveHeight(10),
    },
    {
      title: "Conditions d'utilisation",
      icon: <svg.FileTextSvg />,
      onPress: () => navigation.navigate('TermsOfUse'),
      marginBottom: utils.responsiveHeight(6),
    },
    {
      title: 'Politique de confidentialité',
      icon: <svg.FileTextSvg />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
      marginBottom: utils.responsiveHeight(6),
    },
    {
      title: Platform.OS === 'ios' 
        ? "Conditions d'utilisation Apple" 
        : "Conditions d'utilisation Google",
      icon: <svg.FileTextSvg />,
      onPress: Platform.OS === 'ios' 
        ? () => Linking.openURL('https://www.apple.com/legal/internet-services/itunes/chfr/terms.html')
        : () => Linking.openURL('https://play.google.com/about/play-terms/'),
      marginBottom: utils.responsiveHeight(6),
    },
  ];

  const renderMenu = (): JSX.Element => (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: utils.responsiveWidth(20),
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {menuItems.map((item, index) => (
          <components.ProfileItem
            key={index}
            title={item.title}
            onPress={item.onPress}
            icon={item.icon}
            goNavigation={true}
            containerStyle={{ marginBottom: item.marginBottom }}
          />
        ))}
      </View>
    </ScrollView>
  );

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

export default Profile;