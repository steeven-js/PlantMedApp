
export interface PlantType {
  id: string;
  name: string;
  scientificName: string;
  genre: string;
  famille: string;
  description: string;
  image: string;
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
