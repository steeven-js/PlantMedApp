import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Alert,
  Platform,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Loader from './Loader';
import {utils} from '../utils';
import {text} from '../text';
import {items} from '../items';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {HeaderType} from '../types';
import {components} from '../components';
import {useAuth} from '../hooks/useAuth';
import packageJson from '../../package.json';
import {queryHooks} from '../store/slices/apiSlice';
import {useAppSelector} from '../store';

const Header: React.FC<HeaderType> = ({
  title,
  style,
  search,
  onGoBack,
  burgerIcon,
  goBackIcon,
  bottomLine,
}) => {
  const navigation = hooks.useAppNavigation();

  const [showModal, setShowModal] = useState(false);

  const {user} = useAuth();

  const isPremium = useAppSelector(state => state.premiumSlice.premium);

  const wishlist = hooks.useAppSelector(
    state => state.plantmedWishlistSlice.list,
  );

  const {
    data: plantsData,
    error: plantsError,
    isLoading: plantsLoading,
  } = queryHooks.useGetPlantmedQuery();

  const featuredQuantity = plantsData?.plantmed.filter(
    item => item.is_featured,
  ).length;
  const bestQuantity = plantsData?.plantmed.filter(
    item => item.is_best_seller,
  ).length;
  const wishlistQty = wishlist.length;

  const isLoading = plantsLoading;

  const renderGoBack = (): JSX.Element | null => {
    if (goBackIcon && navigation.canGoBack()) {
      return (
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <svg.GoBackSvg />
          </TouchableOpacity>
        </View>
      );
    }

    if (onGoBack && navigation.canGoBack()) {
      return (
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
            onPress={onGoBack}
          >
            <svg.GoBackSvg />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const renderBurgerMenu = (): JSX.Element => {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{margin: 0, padding: 0}}
        animationIn='slideInLeft'
        animationOut='slideOutLeft'
        animationInTiming={500}
        animationOutTiming={500}
        deviceWidth={theme.sizes.deviceWidth}
        deviceHeight={theme.sizes.deviceHeight}
        // statusBarTranslucent={true}
      >
        <View
          style={{
            height: theme.sizes.deviceHeight,
            width: utils.responsiveWidth(270, true),
            backgroundColor: theme.colors.white,
            paddingTop: utils.statusBarHeight(),
          }}
        >
          <custom.ImageBackground
            style={{flex: 1}}
            resizeMode='stretch'
            source={require('../assets/bg/01.png')}
          >
            {/* CLOSE BUTTON */}
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                paddingHorizontal: 10,
                paddingTop: 10,
              }}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <svg.CloseSvg />
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
            >
              {/* USER INFO */}
              {user && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    borderBottomWidth: 6,
                    borderBottomColor: theme.colors.antiFlashWhite,
                    flexDirection: 'column',
                  }}
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('EditProfile');
                  }}
                >
                  <components.Avatar
                    size={60}
                    uri={user?.photoURL}
                    name={user?.displayName}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.colors.mainColor,
                        ...theme.fonts.Inter_600SemiBold,
                        fontSize: Platform.OS === 'ios' ? 18 : 16,
                        textTransform: 'capitalize',
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      numberOfLines={1}
                    >
                      {user?.displayName || ''}
                    </Text>
                    <Text
                      style={{
                        ...theme.fonts.DM_Sans_400Regular,
                        color: theme.colors.textColor,
                        fontSize: Platform.OS === 'ios' ? 18 : 16,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      numberOfLines={1}
                    >
                      {user?.email || ''}
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.mainColor,
                        ...theme.fonts.Inter_600SemiBold,
                        fontSize: Platform.OS === 'ios' ? 14 : 12,
                        textTransform: 'capitalize',
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      numberOfLines={1}
                    >
                      {isPremium ? 'Membre Premium' : 'Membre Standard'}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {/* MENU */}
              <items.BurgerMenuItem
                title={'>  Plantmed Premium'}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('Premium');
                }}
              />
              <items.BurgerMenuItem
                qty={`${wishlistQty}`}
                title='>  Mes Favoris'
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('Favorites');
                }}
              />
              <items.BurgerMenuItem
                qty={`${bestQuantity}`}
                title={'>  Les plus consultées'}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('PlantMedList', {
                    title: 'Les plus consultées',
                    products:
                      plantsData?.plantmed.filter(
                        item => item.is_best_seller,
                      ) ?? [],
                  });
                }}
              />
              <items.BurgerMenuItem
                qty={`${featuredQuantity}`}
                title={'>  Plantes en vedette'}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('PlantMedList', {
                    title: 'Plantes en vedette',
                    products:
                      plantsData?.plantmed.filter(item => item.is_featured) ??
                      [],
                  });
                }}
              />
              <items.BurgerMenuItem
                title={">  Conditions d'utilisation"}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('TermsOfUse');
                }}
              />
              <items.BurgerMenuItem
                title={'>  Politique de confidentialité'}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('PrivacyPolicy');
                }}
              />
              <items.BurgerMenuItem
                title={'>  Sources'}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('Sources');
                }}
              />
              <items.BurgerMenuItem
                title={'>  Support'}
                onPress={() => {
                  Alert.alert(
                    'Contact us',
                    'Please contact us via email at contact@jsprod.com',
                    [
                      {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                      },
                    ],
                  );
                }}
              />
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: utils.homeIndicatorHeight(),
                left: 0,
                right: 0,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>Version : {packageJson.version} - Août 2024</Text>
            </View>
          </custom.ImageBackground>
        </View>
      </Modal>
    );
  };

  const renderBurgerIcon = (): JSX.Element | null => {
    if (burgerIcon) {
      return (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <svg.BurgerSvg />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const currentTabScreen = hooks.useAppSelector(state => state.tabSlice.screen);

  const renderSearch = (): JSX.Element | null => {
    if (search) {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: theme.sizes.deviceWidth - 210,
            marginRight: 60,
          }}
          onPress={() => 
            currentTabScreen === 'Plants' 
              ? navigation.navigate('SearchPlant') 
              : navigation.navigate('SearchSymptom')
          }>
          <View style={{marginRight: 7}}>
            <svg.SearchSvg />
          </View>
          <Text
            style={{
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 18 : 16,
              color: theme.colors.textColor,
              textTransform: 'capitalize',
            }}
          >
            Recherche
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderTitle = (): JSX.Element | null => {
    if (title) {
      return (
        <Text
          style={{
            color: theme.colors.mainColor,
            textTransform: title === 'FAQ' ? 'uppercase' : 'none',
            ...theme.fonts.DM_Sans_500Medium,
            fontSize: Platform.OS === 'ios' ? 20 : 18,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      );
    }

    return null;
  };

  const renderContent = (): JSX.Element => {
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 52,
      borderBottomWidth: bottomLine ? 1 : 0,
      borderBottomColor: theme.colors.antiFlashWhite,
      ...style,
    };

    if (isLoading) {
      <Loader />;
    }

    return (
      <custom.ImageBackground
        resizeMode='stretch'
        source={require('../assets/bg/01.png')}
      >
        <View style={{...containerStyle}}>
          {renderGoBack()}
          {renderBurgerIcon()}
          {renderTitle()}
          {renderSearch()}
          {renderBurgerMenu()}
        </View>
      </custom.ImageBackground>
    );
  };

  return renderContent();
};

export default Header;
