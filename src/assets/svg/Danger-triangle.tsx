import * as React from 'react';

import Svg, { Path, Circle } from 'react-native-svg';

type Props = {
  fillColor?: string;
  strokeColor?: string;
  width?: string;
  height?: string;
};

const DangerTriangleSvg: React.FC<Props> = ({
  fillColor = '#1C274C',
  strokeColor = '#1C274C',
  width = '50px',
  height = '50px',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.30928 9C8.59494 5 9.96832 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.45498 18.0635 2.24306 16.2635 4.05373 13"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path d="M12 8V13" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" />
      <Circle cx="12" cy="16" r="1" fill={fillColor} />
    </Svg>
  );
};

export default DangerTriangleSvg;
