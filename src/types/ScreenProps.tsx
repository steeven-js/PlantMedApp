import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import type {RootStackParamList} from './RootStackParamList';

export type PlantScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Plant'
>;

export type SymptomScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Symptom'
>;

export type SourceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Source'
>;
