import * as React from 'react';

import Svg, {Path} from 'react-native-svg';

type Props = {
  fillColor?: string;
  strokeColor?: string;
  width?: string;
  height?: string;
};

const SearchLargeSvg: React.FC<Props> = ({
  fillColor = '#4A6973',
  width = 28,
  height = 28,
}) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={fillColor}
        fillRule="evenodd"
        d="M12.834 4.376a8.46 8.46 0 1 0 0 16.916 8.46 8.46 0 0 0 0-16.916ZM2.626 12.834a10.208 10.208 0 1 1 20.417 0 10.208 10.208 0 0 1-20.417 0Z"
        clipRule="evenodd"
      />
      <Path
        fill={fillColor}
        fillRule="evenodd"
        d="M18.6 18.6a1.166 1.166 0 0 1 1.65 0l5.074 5.074a1.166 1.166 0 0 1-1.65 1.65L18.6 20.25a1.166 1.166 0 0 1 0-1.65Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default SearchLargeSvg;
