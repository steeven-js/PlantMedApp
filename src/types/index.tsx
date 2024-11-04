import type {PlantType} from './PlantType';
import type {HeaderType} from './HeaderType';
import type {SymptomType} from './SymptomType';

import {ViewToken} from 'react-native/types';

export type ViewableItemsChanged = {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
};

export type OnboardingTypes = {
  id: number;
  image: string;
  description: string;
  title: string;
};

export type {
  PlantType,
  HeaderType,
  SymptomType,
};
