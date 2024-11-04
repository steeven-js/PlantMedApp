import React, { useState} from 'react';

import {
  View,
} from 'react-native';

import {utils} from '@src/utils';
import {theme} from '@src/constants';
import { PlantType } from '@src/types';


const RenderCarousel = ({item}: {item: PlantType}): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const renderIndicator = (): JSX.Element | null => {
      if (Array.isArray(item?.image) && item.image.length > 1) {
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
            {item.image.map(
              (
                _: any,
                current: React.Key | null | undefined,
                array: string | any[],
              ) => {
                const last = current === array.length - 1;
                return (
                  <View
                    key={current}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor:
                        activeIndex === current
                          ? theme.colors.mainColor
                          : theme.colors.white,
                      borderColor:
                        activeIndex === current
                          ? theme.colors.mainColor
                          : theme.colors.antiFlashWhite,
                      marginRight: last ? 0 : 10,
                      borderWidth: 1,
                    }}
                  />
                );
              },
            )}
          </View>
        );
      }

      return null;
    };

    // const renderInWishlist = (): JSX.Element => {
    //   return (
    //     <custom.PlantInWishlist
    //       item={item}
    //       containerStyle={{
    //         position: 'absolute',
    //         right: 0,
    //         bottom: 0,
    //         paddingHorizontal: 20,
    //         paddingVertical: 24,
    //       }}
    //       version={2}
    //     />
    //   );
    // };

    return (
      <View style={{marginBottom: utils.rsHeight(30)}}>
        {/* {renderImages()} */}
        {renderIndicator()}
        {/* {renderInWishlist()} */}
      </View>
    );
  };

export default RenderCarousel;
