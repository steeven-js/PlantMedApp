import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

const BurgerSvg: React.FC = () => (
  <Svg fill="none" height={12} width={20}>
    <Path
      clipRule="evenodd"
      d="M10 11c0-.552.224-1 .5-1h9c.276 0 .5.448.5 1s-.224 1-.5 1h-9c-.276 0-.5-.448-.5-1ZM0 6a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM0 1c0-.552.224-1 .5-1h9c.276 0 .5.448.5 1s-.224 1-.5 1h-9C.224 2 0 1.552 0 1Z"
      fill="#123258"
      fillRule="evenodd"
    />
  </Svg>
);

export default BurgerSvg;
