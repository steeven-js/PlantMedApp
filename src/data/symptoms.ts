import { SymptomType } from '@src/types';

export const symptoms: SymptomType[] = [
    {
        id: 'symptom-001',
        name: 'Acné',
        description: 'Affection cutanée inflammatoire des follicules pilo-sébacés.',
        image: require('@src/assets/images/symptoms/anxiete.webp'),
        plantIds: ['plant-001', 'plant-002'],
        sources: ['Manuel de phytothérapie'],
        is_active: true,
        is_premium: false,
    },
    {
        id: 'symptom-005',
        name: 'Anti-inflammatoire',
        description: 'Propriété réduisant l\'inflammation dans l\'organisme.',
        image: require('@src/assets/images/symptoms/insomnie.webp'),
        plantIds: ['plant-001', 'plant-002'],
        sources: ['Études cliniques en phytothérapie'],
        is_active: true,
        is_premium: true,
    },
    // ... autres symptômes
];
