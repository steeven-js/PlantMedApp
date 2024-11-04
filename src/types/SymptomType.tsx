
export interface SymptomType {
  id: string;
  name: string;
  description: string;
  image: number; // Pour supporter require('../path/to/image')
  plantIds: string[]; // IDs des plantes
  sources: string[];
  is_active: boolean;
  is_premium: boolean;
}
