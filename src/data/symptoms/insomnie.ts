import { SymptomType } from '@src/types';

export const Insomnie: SymptomType = {
    id: 's2',
    name: 'Insomnie',
    description: 'Difficulté à s\'endormir ou à maintenir le sommeil',
    image: require('../../assets/images/symptoms/insomnie.webp'),
    plants: ['p1', 'p2'],
    sources: ['Société française de recherche sur le sommeil'],
    is_active: true,
    is_premium: true,
};
