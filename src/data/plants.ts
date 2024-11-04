import { PlantType } from '@src/types';

export const plants: PlantType[] = [
    {
        id: 'plant-001',
        name: 'Absinthe',
        scientificName: 'Artemisia absinthium',
        description: "L'absinthe est une plante aromatique aux propriétés médicinales.",
        image: require('@src/assets/images/plants/lavande.png'),
        symptomIds: ['symptom-001', 'symptom-005'],
        habitat: 'Terrains secs et ensoleillés',
        propriete: 'Apéritive, digestive, vermifuge',
        usageInterne: 'En infusion, 2-3 tasses par jour avant les repas',
        usageExterne: 'En compresse pour les contusions',
        precaution: 'Déconseillée aux femmes enceintes et allaitantes',
        sources: ['Pharmacopée française', 'OMS monographies'],
        is_active: true,
        is_premium: false,
    },
    {
        id: 'plant-002',
        name: 'Achillée',
        scientificName: 'Achillea millefolium',
        description: "L'achillée millefeuille est une plante médicinale traditionnelle.",
        image: require('@src/assets/images/plants/thym.png'),
        symptomIds: ['symptom-001', 'symptom-005'],
        habitat: 'Prairies, bords des chemins',
        propriete: 'Anti-inflammatoire, hémostatique',
        usageInterne: 'Infusion, 2-3 tasses par jour',
        usageExterne: 'En cataplasme sur les plaies',
        precaution: 'Éviter pendant la grossesse',
        sources: ['Pharmacopée européenne'],
        is_active: true,
        is_premium: false,
    },
    // ... autres plantes
];
