import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const GoBackSvg: React.FC = () => {
  return (
    <Svg
      width={24} 
      height={36}
      fill='none'
    >
      <G clipPath='url(#a)'>
        <Path
          stroke='#123258'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='M14 26 2 14l12-12'
        />
      </G>
      <Defs>
        <ClipPath id='a'>
          <Path
            fill='#fff'
            d='M0 0h16v28H0z'
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default GoBackSvg;
