import * as React from 'react';

import Svg, { G, Defs, Path, ClipPath } from 'react-native-svg';

const GoBackSvg: React.FC = () => (
    <Svg
      fill="none"
      height={36}
      width={24}
    >
      <G clipPath="url(#a)">
        <Path
          d="M14 26 2 14l12-12"
          stroke="#123258"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path
            d="M0 0h16v28H0z"
            fill="#fff"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );

export default GoBackSvg;
