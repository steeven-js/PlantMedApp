import { PlantType } from '../../types';

export const Lavande: PlantType = {
    id: 'p1',
    name: 'Lavande',
    scientificName: 'Lavandula angustifolia',
    description: 'Plante aromatique aux propriétés calmantes et relaxantes.',
    image: require('../../assets/images/plants/lavande.png'),
    symptoms: ['s1', 's2', 's3'],
    habitat: 'Régions méditerranéennes, sols calcaires et ensoleillés',
    propriete: 'Antispasmodique, antiseptique, cicatrisante',
    usageInterne: 'Infusion: 1-2 cuillères à café par tasse, 2-3 fois par jour',
    usageExterne: 'Huile essentielle en massage ou en bain',
    precaution: 'Éviter pendant la grossesse. Ne pas utiliser l\'huile essentielle pure sur la peau',
    sources: ['Pharmacopée française', 'European Medicines Agency'],
    is_active: true,
    is_premium: false,
};
