import React, { useState } from 'react';

import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';

import { usePlantPress } from '@src/hooks/useCommonNav';

import { text } from '@src/text';
import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { svg } from '@src/assets/svg';
import { components } from '@src/components';
import { SymptomScreenProps } from '@src/types/ScreenProps';
import { theme } from '@src/constants';
import { PlantType } from '@src/types';
import { useRelatedPlants } from '@src/hooks/useData';

const Symptom: React.FC<SymptomScreenProps> = ({route}) => {
  const {item} = route.params;
  const {plants: relatedPlants} = useRelatedPlants(item.id);
  const [tab, setTab] = useState(0);
  const handlePlantPress = usePlantPress();

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
        resizeMode="contain"
        source={item.image}
        style={{
          aspectRatio: 1200 / 500,
          width: theme.sizes.deviceWidth,
          backgroundColor: theme.colors.imageBackground,
        }}
      />
    );
  };

  const renderCarousel = (): JSX.Element | null => {
    return (
      <View style={{marginBottom: utils.rsHeight(30)}}>{renderImage()}</View>
    );
  };

  const renderTabs = (): JSX.Element => {
    const tabs = [
      {name: 'Description', svg: <svg.InfoSquareSvg />, isPremium: false},
      {name: 'Plantes', svg: <svg.ClipboardListSvg />, isPremium: false},
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
                tab === index ? theme.colors.white : theme.colors.transparent,
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
                <svg.TabPremiumSvg />
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

    if (relatedPlants.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <text.T18
            style={{
              color: theme.colors.textColor,
              textAlign: 'center',
            }}
          >
            Aucune plante disponible pour ce symptôme
          </text.T18>
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
          paddingHorizontal: 20,
        }}
      >
        {relatedPlants.map((plant, index) => (
          <TouchableOpacity
            key={plant.id || index}
            style={{
              width: utils.responsiveWidth(150, true),
              height: utils.responsiveWidth(150, true),
              marginBottom: 40,
              justifyContent: 'space-around',
            }}
            onPress={() => handlePlantPress(plant as PlantType)}
          >
            <custom.ImageBackground
              source={plant.image}
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
              resizeMode="cover"
            >
              {plant.is_premium && Platform.OS === 'ios' && (
                <custom.PlantPrenium
                  item={plant}
                  containerStyle={{
                    position: 'absolute',
                    padding: 14,
                    top: -10,
                    left: -10,
                  }}
                />
              )}

              <text.T18
                numberOfLines={2}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  color: theme.colors.mainColor,
                  padding: 5,
                }}
              >
                {plant.name}
              </text.T18>
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
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
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
