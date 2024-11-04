import React from 'react';

import { View, Text, Alert, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

import packageJson from '../../package.json';
import BurgerMenuItem from './BurgerMenuItem';

import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { svg } from '@src/assets/svg';
import { theme } from '@src/constants';
import { components } from '@src/components';

interface BurgerMenuProps {
  setShowModal: (show: boolean) => void;
  navigation: NavigationProp<any>;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ setShowModal, navigation }) => {
  const renderUserSection = () => (
    <TouchableOpacity style={styles.userSection}>
      <components.Avatar
        size={60}
        uri={require('../assets/images/illustration-logo.png')}
        name={'user Test'}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName} numberOfLines={1}>
          user Test
        </Text>
        <Text style={styles.userEmail} numberOfLines={1}>
          user Test
        </Text>
        <Text style={styles.memberStatus} numberOfLines={1}>
          Membre Standard
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMenuItems = () => (
    <>
      {Platform.OS === 'ios' && (
        <BurgerMenuItem
          title={'Plantmed Premium'}
          icon={<svg.MenuPremiumSvg />}
          onPress={() => {
            setShowModal(false);
            navigation.navigate('Premium');
          }}
        />
      )}
      <BurgerMenuItem
        title={"Conditions d'utilisation"}
        icon={<svg.MenuDocSvg />}
        onPress={() => {
          setShowModal(false);
          navigation.navigate('TermsOfUse');
        }}
      />
      <BurgerMenuItem
        title={'Politique de confidentialité'}
        icon={<svg.MenuDocSvg />}
        onPress={() => {
          setShowModal(false);
          navigation.navigate('PrivacyPolicy');
        }}
      />
      <BurgerMenuItem
        title={'Sources'}
        icon={<svg.MenuSourceSvg />}
        onPress={() => {
          setShowModal(false);
          navigation.navigate('Sources');
        }}
      />
      <BurgerMenuItem
        title={'Support'}
        icon={<svg.MenuSupportSvg />}
        onPress={() => {
          Alert.alert(
            'Contact us',
            'Please contact us via email at contact@jsprod.com',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <custom.ImageBackground
        style={styles.background}
        resizeMode="stretch"
        source={require('../assets/bg/02.png')}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowModal(false)}
          activeOpacity={0.7}
        >
          <svg.CloseSvg />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderUserSection()}
          {renderMenuItems()}
        </ScrollView>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            Version : {packageJson.version} - Août 2024
          </Text>
        </View>
      </custom.ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.deviceHeight,
    width: utils.responsiveWidth(270, true),
    backgroundColor: theme.colors.white,
    paddingTop: utils.statusBarHeight(),
  },
  background: {
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  userSection: {
    paddingHorizontal: 20,
    borderBottomWidth: 6,
    borderBottomColor: theme.colors.antiFlashWhite,
    flexDirection: 'column',
  },
  userInfo: {
    marginTop: 5,
  },
  userName: {
    color: theme.colors.mainColor,
    ...theme.fonts.Inter_600SemiBold,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    textTransform: 'capitalize',
    marginVertical: 5,
  },
  userEmail: {
    ...theme.fonts.DM_Sans_400Regular,
    color: theme.colors.textColor,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    marginVertical: 5,
  },
  memberStatus: {
    color: theme.colors.mainColor,
    ...theme.fonts.Inter_600SemiBold,
    fontSize: Platform.OS === 'ios' ? 14 : 12,
    textTransform: 'capitalize',
    marginVertical: 5,
  },
  versionContainer: {
    position: 'absolute',
    bottom: utils.homeIndicatorHeight(),
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    color: theme.colors.textColor,
    fontSize: 12,
    ...theme.fonts.DM_Sans_400Regular,
  },
});

export default BurgerMenu;
