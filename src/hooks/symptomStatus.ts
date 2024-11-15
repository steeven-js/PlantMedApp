// symptomStatus.ts

interface SymptomStatus {
    is_active: boolean;
    is_premium: boolean;
}

type SymptomStatusConfig = {
    [symptomId: string]: SymptomStatus;
};

export const symptomStatus: SymptomStatusConfig = {
    's-001': { is_active: true, is_premium: false },
    's-002': { is_active: true, is_premium: false },
    's-003': { is_active: true, is_premium: true },
    's-004': { is_active: true, is_premium: false },
    's-005': { is_active: true, is_premium: false },
    's-006': { is_active: true, is_premium: false },
    's-007': { is_active: true, is_premium: true },
    's-008': { is_active: true, is_premium: false },
    's-009': { is_active: true, is_premium: false },
    's-010': { is_active: true, is_premium: true },
    's-011': { is_active: true, is_premium: false },
    's-012': { is_active: false, is_premium: false },
    's-013': { is_active: true, is_premium: true },
    's-014': { is_active: true, is_premium: false },
    's-015': { is_active: true, is_premium: false },
    's-016': { is_active: true, is_premium: true },
    's-017': { is_active: true, is_premium: false },
    's-018': { is_active: false, is_premium: false },
    's-019': { is_active: true, is_premium: true },
    's-020': { is_active: true, is_premium: false },
    // ... continuer pour tous les symptômes
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
