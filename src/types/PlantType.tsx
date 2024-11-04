import { ImageRequireSource } from 'react-native';

export interface PlantType {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: ImageRequireSource;
  symptomIds: string[];
  habitat: string;
  propriete: string;
  usageInterne: string;
  usageExterne: string;
  precaution: string;
  sources: string[];
  is_active	: boolean;
  is_premium: boolean;
}
