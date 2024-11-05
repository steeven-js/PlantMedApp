import { ImageRequireSource } from 'react-native';

export interface PlantType {
  id: string;
  name: string;
  scientificName: string;
  genre: string;
  famille: string;
  description: string;
  image: ImageRequireSource | string; // Modifié pour accepter les deux types
  symptomIds: string[];
  habitat: string;
  propriete: string[];
  usageInterne: string;
  usageExterne: string;
  precaution: string[];
  sources: string[];
  is_active	: boolean;
  is_premium: boolean;
}
