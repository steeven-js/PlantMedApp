import { PlantType } from './PlantType';
import { SymptomType } from './SymptomType';

export type RootStackParamList = {
  TabNavigator: undefined;
  Plant: { item: PlantType; id: string };
  Symptom: { item: SymptomType; id: string };
  Premium: undefined;
  TermsOfUse: undefined;
  PrivacyPolicy: undefined;
  Source: undefined;
  SearchPlant: undefined;
  SearchSymptom: undefined;
  Test: undefined;
  PleaseUpdate: undefined;
};
