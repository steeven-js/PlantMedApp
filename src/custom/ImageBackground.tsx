import React from 'react';

import { ImageStyle } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

const ImageProgress = createImageProgress(FastImage);

type Props = {
  source: number | Source;
  style?: object;
  imageStyle?: ImageStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  children?: React.ReactNode;
};

const ImageBackground: React.FC<Props> = ({
  children,
  source,
  resizeMode,
  style,
  imageStyle,
}): JSX.Element => (
  <ImageProgress
    imageStyle={{
      ...imageStyle,
    }}
    resizeMode={
      resizeMode === 'cover'
        ? FastImage.resizeMode.cover
        : resizeMode === 'contain'
        ? FastImage.resizeMode.contain
        : FastImage.resizeMode.stretch
    }
    source={
      typeof source === 'number'
        ? source
        : { uri: (source as Source).uri, priority: FastImage.priority.normal }
    }
    style={style}
  >
    {children}
  </ImageProgress>
);

export default ImageBackground;
