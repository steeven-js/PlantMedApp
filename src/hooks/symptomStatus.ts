// symptomStatus.ts

interface SymptomStatus {
    is_active: boolean;
    is_premium: boolean;
}

type SymptomStatusConfig = {
    [symptomId: string]: SymptomStatus;
};

export const symptomStatus: SymptomStatusConfig = {
    's-001': { is_active: true, is_premium: true },
    's-002': { is_active: true, is_premium: true },
    's-003': { is_active: true, is_premium: true },
    's-004': { is_active: true, is_premium: true },
    's-005': { is_active: true, is_premium: true },
    's-006': { is_active: true, is_premium: true },
    's-007': { is_active: true, is_premium: true },
    's-008': { is_active: true, is_premium: false },
    's-009': { is_active: true, is_premium: false },
    's-010': { is_active: true, is_premium: true },
    's-011': { is_active: true, is_premium: true },
    's-012': { is_active: true, is_premium: true },
    's-013': { is_active: true, is_premium: true },
    's-014': { is_active: true, is_premium: true },
    's-015': { is_active: true, is_premium: true },
    's-016': { is_active: true, is_premium: true },
    's-017': { is_active: true, is_premium: true },
    's-018': { is_active: false, is_premium: false },
    's-019': { is_active: true, is_premium: true },
    's-020': { is_active: true, is_premium: false },
    's-021': { is_active: false, is_premium: true },
    's-022': { is_active: true, is_premium: false },
    's-023': { is_active: true, is_premium: false },
    's-024': { is_active: false, is_premium: true },
    's-025': { is_active: true, is_premium: false },
    's-026': { is_active: true, is_premium: false },
    's-027': { is_active: true, is_premium: true },
    's-028': { is_active: true, is_premium: false },
    's-029': { is_active: true, is_premium: true },
    's-030': { is_active: true, is_premium: false },
    's-031': { is_active: true, is_premium: true },
    's-032': { is_active: true, is_premium: false },
    's-033': { is_active: true, is_premium: false },
    's-034': { is_active: true, is_premium: true },
    's-035': { is_active: true, is_premium: false },
    's-036': { is_active: true, is_premium: true },
    's-037': { is_active: true, is_premium: false },
    's-038': { is_active: true, is_premium: true },
    's-039': { is_active: false, is_premium: false },
    's-040': { is_active: true, is_premium: true },
    's-041': { is_active: true, is_premium: false },
    's-042': { is_active: false, is_premium: true },
    's-043': { is_active: true, is_premium: false },
    's-044': { is_active: true, is_premium: true },
    's-045': { is_active: true, is_premium: false },
    's-046': { is_active: true, is_premium: true },
    's-047': { is_active: true, is_premium: false },
    's-048': { is_active: true, is_premium: true },
    's-049': { is_active: true, is_premium: false },
    's-050': { is_active: true, is_premium: true },
    's-051': { is_active: true, is_premium: false },
    's-052': { is_active: true, is_premium: true },
    's-053': { is_active: true, is_premium: false },
    's-054': { is_active: true, is_premium: true },
    's-055': { is_active: false, is_premium: false },
    's-056': { is_active: true, is_premium: true },
    's-057': { is_active: true, is_premium: false },
    's-058': { is_active: true, is_premium: true },
    's-059': { is_active: false, is_premium: false },
    's-060': { is_active: true, is_premium: true },
    's-061': { is_active: true, is_premium: false },
    's-062': { is_active: true, is_premium: true },
    's-063': { is_active: false, is_premium: false },
    's-064': { is_active: true, is_premium: true },
    's-065': { is_active: true, is_premium: false },
    's-066': { is_active: true, is_premium: true },
    's-067': { is_active: true, is_premium: false },
    's-068': { is_active: true, is_premium: true },
    's-069': { is_active: true, is_premium: false },
    's-070': { is_active: true, is_premium: true },
    's-071': { is_active: true, is_premium: false },
    's-072': { is_active: true, is_premium: true },
    's-073': { is_active: true, is_premium: false },
    's-074': { is_active: true, is_premium: true },
    's-075': { is_active: true, is_premium: false },
    's-076': { is_active: true, is_premium: true },
    's-077': { is_active: true, is_premium: false },
    's-078': { is_active: true, is_premium: true },
    's-079': { is_active: true, is_premium: false },
    's-080': { is_active: true, is_premium: true },
    's-081': { is_active: true, is_premium: false },
    's-082': { is_active: false, is_premium: true },
    's-083': { is_active: true, is_premium: false },
    's-084': { is_active: true, is_premium: true },
    's-085': { is_active: true, is_premium: false },
    's-086': { is_active: true, is_premium: true },
    's-087': { is_active: true, is_premium: false },
    's-088': { is_active: true, is_premium: true },
    's-089': { is_active: true, is_premium: false },
    's-090': { is_active: true, is_premium: true },
    's-091': { is_active: true, is_premium: false },
};


// Fonction utilitaire pour vérifier le statut d'un symptôme
export const checkSymptomStatus = (symptomId: string): SymptomStatus => {
    if (!symptomStatus[symptomId]) {
        throw new Error(`Symptom ID ${symptomId} not found in status configuration`);
    }
    return symptomStatus[symptomId];
};

// Fonction pour obtenir tous les symptômes actifs
export const getActiveSymptoms = (): string[] => {
    return Object.entries(symptomStatus)
        .filter(([_, status]) => status.is_active)
        .map(([symptomId]) => symptomId);
};

// Fonction pour obtenir tous les symptômes premium
export const getPremiumSymptoms = (): string[] => {
    return Object.entries(symptomStatus)
        .filter(([_, status]) => status.is_premium)
        .map(([symptomId]) => symptomId);
};

// Fonction pour vérifier si un symptôme est à la fois actif et premium
export const isActiveAndPremium = (symptomId: string): boolean => {
    const status = symptomStatus[symptomId];
    return status ? status.is_active && status.is_premium : false;
};
