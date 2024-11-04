import { PlantType } from './PlantType';
import { SymptomType } from './SymptomType';

export type RootStackParamList = {
  TabNavigator: any;
  Plant: { item: PlantType, id: string };
  Symptom: { item: SymptomType, id: string };
  Premium: any;
  TermsOfUse: any;
  PrivacyPolicy: any;
  Source: any;
  SearchPlant: any;
  SearchSymptom: any;
  Test: any;
};
