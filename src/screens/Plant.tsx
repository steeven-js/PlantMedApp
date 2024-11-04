import React, { useRef, useState } from 'react';

import { FlatList, Platform, ScrollView, TouchableOpacity, View } from 'react-native';

import RenderUse from './plant/RenderUse';
import RenderCaution from './plant/RenderCaution';
import RenderProperty from './plant/RenderProperty';
import RenderDescription from './plant/RenderDescription';

import { text } from '@src/text';
import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { svg } from '@src/assets/svg';
import { theme } from '@src/constants';
import { components } from '@src/components';
import { ViewableItemsChanged } from '@src/types';
import { PlantScreenProps } from '@src/types/ScreenProps';

const Plant: React.FC<PlantScreenProps> = ({ route }) => {
  const { item } = route.params;

  const [tab, setTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef((info: ViewableItemsChanged) => {
    const index = info.viewableItems[0]?.index ?? 0;
    setActiveIndex(index);
  }).current;

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title={item?.name}
        logoIcon={true}
        goBackIcon={true}
        basketIcon={true}
        bottomLine={true}
        exception={true}
      />
    );
  };

  const renderImages = (): JSX.Element => {
    const images = Array.isArray(item.image) ? item.image : [item.image];

    return (
      <FlatList
        bounces={false}
        horizontal
        data={images}
        pagingEnabled
        style={{ flexGrow: 0 }}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: imageUrl }) => (
          <custom.Image
            resizeMode="contain"
            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
            style={{
              aspectRatio: 700 / 500,
              width: theme.sizes.deviceWidth,
              backgroundColor: theme.colors.imageBackground,
            }}
          />
        )}
      />
    );
  };

  const renderCarousel = (): JSX.Element | null => {
    const images = Array.isArray(item.image) ? item.image : [item.image];

    const renderIndicator = (): JSX.Element | null => {
      if (images.length <= 1) {return null;}

      return (
        <View
          style={{
            bottom: 31,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            alignSelf: 'center',
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: activeIndex === index
                  ? theme.colors.mainColor
                  : theme.colors.white,
                borderColor: activeIndex === index
                  ? theme.colors.mainColor
                  : theme.colors.antiFlashWhite,
                marginRight: index === images.length - 1 ? 0 : 10,
                borderWidth: 1,
              }}
            />
          ))}
        </View>
      );
    };

    if (!item?.image) {return null;}

    return (
      <View style={{
        marginBottom: utils.rsHeight(30),
        position: 'relative',
      }}>
        {renderImages()}
        {renderIndicator()}
      </View>
    );
  };

  const renderTabs = (): JSX.Element => {
    const tabs = [
      { name: 'Description', svg: <svg.InfoSquareSvg />, isPremium: false },
      {
        name: 'Propriétés',
        svg: <svg.ClipboardListSvg />,
        isPremium: Platform.OS === 'ios' ? true : false,
      },
      {
        name: 'Usages',
        svg: <svg.handHeartSvg />,
        isPremium: Platform.OS === 'ios' ? true : false,
      },
      { name: 'Précautions', svg: <svg.DangerTriangleSvg />, isPremium: false },
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
              borderColor: tab === index ? theme.colors.steelTeal : theme.colors.transparent,
              backgroundColor: tab === index ? theme.colors.white : theme.colors.transparent,
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
            <text.T14
              style={{
                color: theme.colors.textColor,
                textTransform: 'capitalize',
                textAlign: 'center',
              }}
            >
              {tabItem.name}
            </text.T14>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTabContent = (): JSX.Element => {
    if (tab === 0) {
      return <RenderDescription item={item} />;
    } else if (tab === 1) {
      return <RenderProperty item={item} />;
    } else if (tab === 2) {
      return <RenderUse item={item} />;
    } else {
      return <RenderCaution item={item} />;
    }
  };

  const renderContent = (): JSX.Element => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {renderCarousel()}
        {renderTabs()}
        {renderTabContent()}
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={{ flex: 1 }}
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{ backgroundColor: theme.colors.transparent }}
      >
        {renderHeader()}
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default Plant;
