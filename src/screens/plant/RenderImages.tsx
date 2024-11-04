import React, {useRef, useState} from 'react';

import {
  FlatList,
} from 'react-native';

import {custom} from '../../custom';
import {theme} from '../../constants';
import {ViewableItemsChanged} from '../../types';

const RenderImages = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
      }).current;

      const onViewableItemsChanged = useRef((info: ViewableItemsChanged) => {
        const index = info.viewableItems[0]?.index ?? 0;
        setActiveIndex(index);
      }).current;

    return (
      <FlatList
        bounces={false}
        horizontal={true}
        data={item ? item.images : initialPlant?.images}
        pagingEnabled={true}
        style={{flexGrow: 0}}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item}) => {
          return (
            <custom.Image
              resizeMode="contain"
              source={{uri: item}}
              style={{
                // aspectRatio: 375 / 500,
                // aspectRatio: 335 / 165,
                aspectRatio: 700 / 500,
                width: theme.sizes.deviceWidth,
                backgroundColor: theme.colors.imageBackground,
              }}
            />
          );
        }}
      />
    );
  };

export default RenderImages;
