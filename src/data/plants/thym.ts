import { PlantType } from '../../types';

export const Thym: PlantType = {
    id: 'p2',
    name: 'Thym',
    scientificName: 'Thymus vulgaris',
    description: 'Plante aromatique aux puissantes propriétés antiseptiques.',
    image: require('../../assets/images/plants/thym.png'),
    symptoms: ['s2', 's4'],
    habitat: 'Garrigue méditerranéenne, sols secs et rocailleux',
    propriete: 'Antiseptique, expectorant, antibactérien',
    usageInterne: 'Infusion: 1 cuillère à soupe par tasse, 3 fois par jour',
    usageExterne: 'Gargarismes, bains de bouche',
    precaution: 'Éviter en cas d\'ulcère gastrique',
    sources: ['Pharmacopée européenne', 'OMS monographies'],
    is_active: true,
    is_premium: true,
};
