import * as React from 'react';

import Svg, {Path} from 'react-native-svg';

const CloseSvg: React.FC = () => (
  <Svg
    width={48}
    height={48}
    fill="none"
  >
    <Path
      stroke="#4C6780"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m17 17 14 14M17 31 31 17"
    />
  </Svg>
);

export default CloseSvg;
