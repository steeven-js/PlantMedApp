import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

const SearchSvg: React.FC = () => (
  <Svg fill="none" height={14} width={14}>
    <Path
      clipRule="evenodd"
      d="M6.417 2.188a4.23 4.23 0 1 0 0 8.458 4.23 4.23 0 0 0 0-8.459ZM1.313 6.417a5.104 5.104 0 1 1 10.208 0 5.104 5.104 0 0 1-10.209 0Z"
      fill="#4A6973"
      fillRule="evenodd"
    />
    <Path
      clipRule="evenodd"
      d="M9.3 9.3a.583.583 0 0 1 .825 0l2.537 2.537a.583.583 0 0 1-.825.825L9.3 10.125a.583.583 0 0 1 0-.825Z"
      fill="#4A6973"
      fillRule="evenodd"
    />
  </Svg>
);

export default SearchSvg;
