import React, { useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

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
import { getPlantImage, PlantImageName } from '@src/data/plantImages';

interface TabItem {
  name: string;
  svg: JSX.Element;
  isPremium: boolean;
}

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

  const getImage = (imageName: string) => {
    try {
      const image = getPlantImage(imageName as PlantImageName);
      return typeof image === 'number' ? image : { uri: image };
    } catch (error) {
      console.warn(`Image not found for: ${imageName}`);
      return require('@src/assets/images/plants/default.png');
    }
  };

  const renderHeader = (): JSX.Element => (
    <components.Header
      title={item?.name}
      logoIcon={true}
      goBackIcon={true}
      basketIcon={true}
      bottomLine={true}
      exception={true}
    />
  );

  const renderSingleImage = ({ item: imageUrl }: { item: string }): JSX.Element => {
    const source = getImage(imageUrl?.toString() || '');
    return (
      <custom.Image
        resizeMode="contain"
        source={source}
        style={styles.carouselImage}
      />
    );
  };

  const renderImages = (): JSX.Element => {
    const images = Array.isArray(item.image) ? item.image.filter((img): img is string => typeof img === 'string') : [item.image].filter((img): img is string => typeof img === 'string');
    
    return (
      <FlatList
        bounces={false}
        horizontal
        data={images}
        pagingEnabled
        style={styles.imageList}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderSingleImage}
      />
    );
  };

  const renderIndicator = (imagesCount: number): JSX.Element | null => {
    if (imagesCount <= 1) return null;

    return (
      <View style={styles.indicatorContainer}>
        {Array(imagesCount).fill(0).map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: activeIndex === index
                  ? theme.colors.mainColor
                  : theme.colors.white,
                borderColor: activeIndex === index
                  ? theme.colors.mainColor
                  : theme.colors.antiFlashWhite,
                marginRight: index === imagesCount - 1 ? 0 : 10,
              }
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCarousel = (): JSX.Element | null => {
    if (!item?.image) return null;

    const images = Array.isArray(item.image) ? item.image : [item.image];

    return (
      <View style={styles.carouselContainer}>
        {renderImages()}
        {renderIndicator(images.length)}
      </View>
    );
  };

  const renderTab = (tabItem: TabItem, index: number): JSX.Element => (
    <TouchableOpacity
      key={index}
      style={[
        styles.tabButton,
        {
          borderColor: tab === index ? theme.colors.steelTeal : theme.colors.transparent,
          backgroundColor: tab === index ? theme.colors.white : theme.colors.transparent,
        }
      ]}
      onPress={() => setTab(index)}
    >
      {tabItem.svg}
      {tabItem.isPremium && (
        <View style={styles.premiumBadge}>
          <svg.TabPremiumSvg />
        </View>
      )}
      <text.T14 style={styles.tabText}>
        {tabItem.name}
      </text.T14>
    </TouchableOpacity>
  );

  const renderTabs = (): JSX.Element => {
    const tabs: TabItem[] = [
      { name: 'Description', svg: <svg.InfoSquareSvg />, isPremium: false },
      { name: 'Propriétés', svg: <svg.ClipboardListSvg />, isPremium: item.is_premium },
      { name: 'Usages', svg: <svg.handHeartSvg />, isPremium: item.is_premium },
      { name: 'Précautions', svg: <svg.DangerTriangleSvg />, isPremium: false },
    ];

    return (
      <View style={styles.tabsContainer}>
        {tabs.map((tabItem, index) => renderTab(tabItem, index))}
      </View>
    );
  };

  const renderTabContent = (): JSX.Element => {
    switch (tab) {
      case 0:
        return <RenderDescription item={item} />;
      case 1:
        return <RenderProperty item={item} />;
      case 2:
        return <RenderUse item={item} />;
      default:
        return <RenderCaution item={item} />;
    }
  };

  const renderContent = (): JSX.Element => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {renderCarousel()}
      {renderTabs()}
      {renderTabContent()}
    </ScrollView>
  );

  return (
    <custom.ImageBackground
      style={styles.container}
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={styles.safeArea}
      >
        {renderHeader()}
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: theme.colors.transparent,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageList: {
    flexGrow: 0,
  },
  carouselContainer: {
    marginBottom: utils.rsHeight(30),
    position: 'relative',
  },
  carouselImage: {
    aspectRatio: 700 / 500,
    width: theme.sizes.deviceWidth,
    backgroundColor: theme.colors.imageBackground,
  },
  indicatorContainer: {
    bottom: 31,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  tabsContainer: {
    ...theme.flex.rowCenterSpaceEvenly,
    marginBottom: utils.responsiveHeight(20),
  },
  tabButton: {
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    ...theme.flex.colCenter,
    position: 'relative',
  },
  tabText: {
    color: theme.colors.textColor,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Plant;