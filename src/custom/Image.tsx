import React from 'react';

import {createImageProgress} from 'react-native-image-progress';
import FastImage, {ImageStyle, Source} from 'react-native-fast-image';

const ImageProgress = createImageProgress(FastImage);

type Props = {
  source: number | { uri: string } | Source; // Modification ici pour accepter require
  style?: ImageStyle;
  imageStyle?: object;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  tintColor?: string;
};

const Image: React.FC<Props> = ({
  source,
  style,
  imageStyle,
  resizeMode,
  tintColor,
}): JSX.Element => (
    <ImageProgress
      imageStyle={{
        // backgroundColor: colors.imageBackground,
        ...imageStyle,
      }}
      resizeMode={
        resizeMode === 'cover'
          ? FastImage.resizeMode.cover
          : resizeMode === 'contain'
          ? FastImage.resizeMode.contain
          : FastImage.resizeMode.stretch
      }
      source={source}
      style={style}
      tintColor={tintColor}
    />
  );

export default Image;
