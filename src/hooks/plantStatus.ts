// plantStatus.ts

interface PlantStatus {
    is_active: boolean;
    is_premium: boolean;
}

type PlantStatusConfig = {
    [plantId: string]: PlantStatus;
};

export const plantStatus: PlantStatusConfig = {
    'p-001': { is_active: true, is_premium: false },
    'p-002': { is_active: true, is_premium: false },
    'p-003': { is_active: true, is_premium: true },
    'p-004': { is_active: true, is_premium: false },
    'p-005': { is_active: true, is_premium: false },
    'p-006': { is_active: true, is_premium: false },
    'p-007': { is_active: true, is_premium: true },
    'p-008': { is_active: true, is_premium: false },
    'p-009': { is_active: true, is_premium: false },
    'p-010': { is_active: true, is_premium: true },
    'p-011': { is_active: true, is_premium: false },
    'p-012': { is_active: false, is_premium: false },
    'p-013': { is_active: true, is_premium: true },
    'p-014': { is_active: true, is_premium: false },
    'p-015': { is_active: true, is_premium: false },
    'p-016': { is_active: true, is_premium: true },
    'p-017': { is_active: true, is_premium: false },
    'p-018': { is_active: false, is_premium: false },
    'p-019': { is_active: true, is_premium: true },
    'p-020': { is_active: true, is_premium: false },
    'p-021': { is_active: true, is_premium: true },
    'p-022': { is_active: true, is_premium: false },
    'p-023': { is_active: true, is_premium: false },
    'p-024': { is_active: true, is_premium: true },
    'p-025': { is_active: false, is_premium: false },
    'p-026': { is_active: true, is_premium: false },
    'p-027': { is_active: true, is_premium: true },
    'p-028': { is_active: true, is_premium: false },
    'p-029': { is_active: true, is_premium: false },
    'p-030': { is_active: true, is_premium: true },
    'p-031': { is_active: false, is_premium: false },
    'p-032': { is_active: true, is_premium: false },
    'p-033': { is_active: true, is_premium: true },
    'p-034': { is_active: true, is_premium: false },
    'p-035': { is_active: true, is_premium: false },
    'p-036': { is_active: true, is_premium: true },
    'p-037': { is_active: false, is_premium: false },
    'p-038': { is_active: true, is_premium: false },
    'p-039': { is_active: true, is_premium: true },
    'p-040': { is_active: true, is_premium: false },
    'p-041': { is_active: true, is_premium: false },
    'p-042': { is_active: true, is_premium: true },
    'p-043': { is_active: false, is_premium: false },
    'p-044': { is_active: true, is_premium: false },
    'p-045': { is_active: true, is_premium: true },
    'p-046': { is_active: true, is_premium: false },
    'p-047': { is_active: true, is_premium: false },
    'p-048': { is_active: true, is_premium: true },
    'p-049': { is_active: false, is_premium: false },
    'p-050': { is_active: true, is_premium: false },
    'p-051': { is_active: true, is_premium: true },
    'p-052': { is_active: true, is_premium: false },
    'p-053': { is_active: true, is_premium: false },
    'p-054': { is_active: true, is_premium: true },
    'p-055': { is_active: false, is_premium: false },
    'p-056': { is_active: true, is_premium: false },
    'p-057': { is_active: true, is_premium: true },
    'p-058': { is_active: true, is_premium: false },
    'p-059': { is_active: true, is_premium: false },
    'p-060': { is_active: true, is_premium: true },
    'p-061': { is_active: false, is_premium: false },
    'p-062': { is_active: true, is_premium: false },
    'p-063': { is_active: true, is_premium: true },
    'p-064': { is_active: true, is_premium: false },
    'p-065': { is_active: true, is_premium: false },
    'p-066': { is_active: true, is_premium: true },
    'p-067': { is_active: false, is_premium: false },
    'p-068': { is_active: true, is_premium: false },
    'p-069': { is_active: true, is_premium: true },
    'p-070': { is_active: true, is_premium: false },
    'p-071': { is_active: true, is_premium: false },
    'p-072': { is_active: true, is_premium: true },
    'p-073': { is_active: false, is_premium: false },
    'p-074': { is_active: true, is_premium: false },
    'p-075': { is_active: true, is_premium: true },
    'p-076': { is_active: true, is_premium: false },
    'p-077': { is_active: true, is_premium: false },
    'p-078': { is_active: true, is_premium: true },
    'p-079': { is_active: false, is_premium: false },
    'p-080': { is_active: true, is_premium: false },
    'p-081': { is_active: true, is_premium: true },
    'p-082': { is_active: true, is_premium: false },
    'p-083': { is_active: true, is_premium: false },
    'p-084': { is_active: true, is_premium: true },
    'p-085': { is_active: false, is_premium: false },
    'p-086': { is_active: true, is_premium: false },
    'p-087': { is_active: true, is_premium: true },
    'p-088': { is_active: true, is_premium: false },
    'p-089': { is_active: true, is_premium: false },
    'p-090': { is_active: true, is_premium: true },
    'p-091': { is_active: false, is_premium: false },
    'p-092': { is_active: true, is_premium: false },
    'p-093': { is_active: true, is_premium: true },
    'p-094': { is_active: true, is_premium: false },
    'p-095': { is_active: true, is_premium: false },
    'p-096': { is_active: true, is_premium: true },
    'p-097': { is_active: false, is_premium: false },
    'p-098': { is_active: true, is_premium: false },
    'p-099': { is_active: true, is_premium: true },
    'p-100': { is_active: true, is_premium: false },
    'p-101': { is_active: true, is_premium: true },
    'p-102': { is_active: true, is_premium: false },
    'p-103': { is_active: true, is_premium: false },
    'p-104': { is_active: true, is_premium: true },
    'p-105': { is_active: false, is_premium: false },
    'p-106': { is_active: true, is_premium: false },
    'p-107': { is_active: true, is_premium: true },
    'p-108': { is_active: true, is_premium: false },
    'p-109': { is_active: true, is_premium: false },
    'p-110': { is_active: true, is_premium: true },
    'p-111': { is_active: false, is_premium: false },
    'p-112': { is_active: true, is_premium: false },
    'p-113': { is_active: true, is_premium: true },
    'p-114': { is_active: true, is_premium: false },
    'p-115': { is_active: true, is_premium: false },
    'p-116': { is_active: true, is_premium: true },
    'p-117': { is_active: false, is_premium: false },
    'p-118': { is_active: true, is_premium: false },
    'p-119': { is_active: true, is_premium: true },
    'p-120': { is_active: true, is_premium: false },
    'p-121': { is_active: true, is_premium: false },
    'p-122': { is_active: true, is_premium: true },
    'p-123': { is_active: false, is_premium: false },
    'p-124': { is_active: true, is_premium: false },
    'p-125': { is_active: true, is_premium: true },
    'p-126': { is_active: true, is_premium: false },
    'p-127': { is_active: true, is_premium: false },
    'p-128': { is_active: true, is_premium: true },
    'p-129': { is_active: false, is_premium: false },
    'p-130': { is_active: true, is_premium: false },
    'p-131': { is_active: true, is_premium: true },
    'p-132': { is_active: true, is_premium: false },
    'p-133': { is_active: true, is_premium: false },
    'p-134': { is_active: true, is_premium: true },
    'p-135': { is_active: false, is_premium: false },
    'p-136': { is_active: true, is_premium: false },
    'p-137': { is_active: true, is_premium: true },
    'p-138': { is_active: true, is_premium: false },
    'p-139': { is_active: true, is_premium: false },
    'p-140': { is_active: true, is_premium: true },
    'p-141': { is_active: false, is_premium: false },
    'p-142': { is_active: true, is_premium: false },
    'p-143': { is_active: true, is_premium: true },
    'p-144': { is_active: true, is_premium: false },
    'p-145': { is_active: true, is_premium: false },
    'p-146': { is_active: true, is_premium: true },
    'p-147': { is_active: false, is_premium: false },
    'p-148': { is_active: true, is_premium: false },
    'p-149': { is_active: true, is_premium: true },
    'p-150': { is_active: true, is_premium: false },
    'p-151': { is_active: true, is_premium: false },
    'p-152': { is_active: true, is_premium: true },
    'p-153': { is_active: false, is_premium: false },
    'p-154': { is_active: true, is_premium: false },
    'p-155': { is_active: true, is_premium: true },
    'p-156': { is_active: true, is_premium: false },
    'p-157': { is_active: true, is_premium: false },
    'p-158': { is_active: true, is_premium: true },
    'p-159': { is_active: false, is_premium: false },
    'p-160': { is_active: true, is_premium: false },
    'p-161': { is_active: true, is_premium: true },
    'p-162': { is_active: true, is_premium: false },
    'p-163': { is_active: true, is_premium: false },
};

// Fonction utilitaire pour vérifier le statut d'une plante
export const checkPlantStatus = (plantId: string): PlantStatus => {
    if (!plantStatus[plantId]) {
        throw new Error(`Plant ID ${plantId} not found in status configuration`);
    }
    return plantStatus[plantId];
};

// Fonction pour obtenir toutes les plantes actives
export const getActivePlants = (): string[] => {
    return Object.entries(plantStatus)
        .filter(([_, status]) => status.is_active)
        .map(([plantId]) => plantId);
};

// Fonction pour obtenir toutes les plantes premium
export const getPremiumPlants = (): string[] => {
    return Object.entries(plantStatus)
        .filter(([_, status]) => status.is_premium)
        .map(([plantId]) => plantId);
};

// Fonction pour vérifier si une plante est à la fois active et premium
export const isActiveAndPremium = (plantId: string): boolean => {
    const status = plantStatus[plantId];
    return status ? status.is_active && status.is_premium : false;
};
