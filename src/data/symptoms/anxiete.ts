import { SymptomType } from '@src/types';

export const Anxiete: SymptomType = {
    id: 's1',
    name: 'Anxiété',
    description: 'État de tension nerveuse et d\'inquiétude excessive',
    image: require('../../assets/images/symptoms/anxiete.webp'),
    plants: ['p1', 'p3'],
    sources: ['Manuel diagnostique DSM-5'],
    is_active: true,
    is_premium: false,
};
