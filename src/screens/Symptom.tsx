import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  Platform,
} from 'react-native';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {plantmed} from '../plantmed';
import {PlantMedType} from '../types';
import {components} from '../components';
import {useAppSelector} from '../store';
import {queryHooks} from '../store/slices/apiSlice';
import {SymptomScreenProps} from '../types/ScreenProps';

const Symptom: React.FC<SymptomScreenProps> = ({route}) => {
  const {item} = route.params;
  const [tab, setTab] = useState(0);
  const navigation = hooks.useAppNavigation();
  const isPremium = useAppSelector(state => state.premiumSlice.premium);

  const {
    data: plantsData,
    error: plantsError,
    isLoading: plantsLoading,
  } = queryHooks.useGetPlantmedQuery();

  const isError = !!plantsError;
  const isLoading = plantsLoading;
  const plants = plantsData?.plantmed ?? [];

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title={item.name}
        logoIcon={true}
        goBackIcon={true}
        basketIcon={true}
        bottomLine={true}
      />
    );
  };

  const renderImage = (): JSX.Element => {
    return (
      <custom.Image
        resizeMode='contain'
        source={{uri: item.image}}
        style={{
          aspectRatio: 1200 / 500,
          width: theme.sizes.deviceWidth,
          backgroundColor: theme.colors.imageBackground,
        }}
      />
    );
  };

  const renderCarousel = (): JSX.Element | null => {
    if (item.image.length > 0) {
      return (
        <View style={{marginBottom: utils.rsHeight(30)}}>{renderImage()}</View>
      );
    }
    return null;
  };

  const renderTabs = (): JSX.Element => {
    const tabs = [
      {name: 'Description', svg: <svg.infoSquareSvg />, isPremium: false},
      {name: 'Plantes', svg: <svg.clipboardListSvg />, isPremium: false},
    ];

    return (
      <View
        style={{
          ...theme.flex.rowCenterSpaceEvenly,
          marginBottom: utils.responsiveHeight(20),
        }}
      >
        {tabs.map((tabItem, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              paddingVertical: 10,
              borderRadius: 10,
              ...theme.flex.colCenter,
              borderColor:
                tab === index
                  ? theme.colors.steelTeal
                  : theme.colors.transparent,
              backgroundColor:
                tab === index
                  ? theme.colors.white
                  : theme.colors.transparent,
              position: 'relative',
            }}
            onPress={() => setTab(index)}
          >
            {tabItem.svg}
            {tabItem.isPremium && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <svg.TabPreniumSvg />
              </View>
            )}
            <text.T18
              style={{
                color: theme.colors.textColor,
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            >
              {tabItem.name}
            </text.T18>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: utils.responsiveHeight(24),
        }}
      >
        <text.H2
          style={{
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
            marginBottom: utils.responsiveHeight(10),
          }}
        >
          Description
        </text.H2>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: utils.responsiveHeight(6),
          }}
        >
          <text.T18
            style={{
              paddingBottom: 20,
              color: theme.colors.textColor,
            }}
          >
            {item.description}
          </text.T18>
        </View>
      </View>
    );
  };

  const renderPlants = (): JSX.Element => {
    const normalize = (str: string) => str.toLowerCase().trim();
    const filteredPlants = plants.filter(
      plant =>
        Array.isArray(plant.symptoms) &&
        plant.symptoms.some(
          symptom => normalize(symptom) === normalize(item.name),
        ),
    );

    const qty = filteredPlants.length;

    if (qty === 0) {
      Alert.alert('No data', 'No data available for this category');
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 16 : 14,
              color: theme.colors.textColor,
            }}
          >
            No data available for this category
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: utils.responsiveHeight(40),
        }}
      >
        {filteredPlants.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: utils.responsiveWidth(150, true),
              height: utils.responsiveWidth(150, true),
              marginBottom: 40,
              justifyContent: 'space-around',
            }}
            onPress={() => {
              if (qty > 0) {
                if (isPremium) {
                  navigation.navigate('PlantMed', {item});
                } else if (!isPremium && item.is_premium == false) {
                  navigation.navigate('PlantMed', {item});
                } else {
                  navigation.navigate('Premium');
                }
              }
            }}
          >
            <custom.ImageBackground
              source={{uri: item.image ?? 'default_image_uri'}}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                paddingTop: 14,
                paddingBottom: 12,
              }}
              imageStyle={{
                borderRadius: 10,
                backgroundColor: theme.colors.imageBackground,
              }}
              resizeMode='cover'
            >
              {item.is_premium ? (
                <plantmed.PlantPrenium
                  item={item as PlantMedType}
                  containerStyle={{
                    position: 'absolute',
                    padding: 14,
                    top: -10,
                    left: -10,
                  }}
                />
              ) : null}

              <Text
                numberOfLines={2}
                style={{
                  fontSize: Platform.OS === 'ios' ? 20 : 18,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  color: theme.colors.mainColor,
                  ...theme.fonts.DM_Sans_400Regular,
                  padding: 5,
                }}
              >
                {item.name}
              </Text>
            </custom.ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTabContent = (): JSX.Element => {
    switch (tab) {
      case 0:
        return renderDescription();
      case 1:
        return renderPlants();
      default:
        return renderDescription();
    }
  };

  const renderContent = (): JSX.Element => {
    if (isError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              ...theme.fonts.DM_Sans_400Regular,
              fontSize: Platform.OS === 'ios' ? 16 : 14,
              color: theme.colors.textColor,
            }}
          >
            An error occurred while fetching the data.
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return <components.Loader />;
    }

    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderCarousel()}
        {renderTabs()}
        {renderTabContent()}
      </ScrollView>
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

export default Symptom;
