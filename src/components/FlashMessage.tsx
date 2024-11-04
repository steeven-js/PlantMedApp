import React from 'react';

import FlashMessageLib from 'react-native-flash-message';

import { utils } from '@src/utils';

const FlashMessage: React.FC = () => {
  const height = utils.statusBarHeight();

  return (
    <FlashMessageLib
      position="top"
      renderBeforeContent={() => null}
      statusBarHeight={height}
    />
  );
};

export default FlashMessage;
