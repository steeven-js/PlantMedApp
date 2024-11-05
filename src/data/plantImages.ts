// Create a new file imageMapping.ts
const plantImages = {
    'Absinthe.png': require('@src/assets/images/plants/Absinthe.png'),
    'Achillee.png': require('@src/assets/images/plants/Achillee.png'),
    'Actee_a_grappe.png': require('@src/assets/images/plants/Actee_a_grappe.png'),
    'Agave.png': require('@src/assets/images/plants/Agave.png'),
    'Agripaume.png': require('@src/assets/images/plants/Agripaume.png'),
    'Aigremoine.png': require('@src/assets/images/plants/Aigremoine.png'),
    'Ail.png': require('@src/assets/images/plants/Ail.png'),
    'Aloe_Vera.png': require('@src/assets/images/plants/Aloe_Vera.png'),
    'Amandier.png': require('@src/assets/images/plants/Amandier.png'),
    'Amarante.png': require('@src/assets/images/plants/Amarante.png'),
    'Aneth.png': require('@src/assets/images/plants/Aneth.png'),
    'Angelique.png': require('@src/assets/images/plants/Angelique.png'),
    'Arbre_a_the.png': require('@src/assets/images/plants/Arbre_a_the.png'),
    'Argousier.png': require('@src/assets/images/plants/Argousier.png'),
    'Armoise_commune.png': require('@src/assets/images/plants/Armoise_commune.png'),
    'Arnica.png': require('@src/assets/images/plants/Arnica.png'),
    'Artichaut.png': require('@src/assets/images/plants/Artichaut.png'),
    'Aubepine_monogyne.png': require('@src/assets/images/plants/Aubepine_monogyne.png'),
    'Acai.png': require('@src/assets/images/plants/Acai.png'),
    'Badianier_de_Chine.png': require('@src/assets/images/plants/Badianier_de_Chine.png'),
    'Bardane.png': require('@src/assets/images/plants/Bardane.png'),
    'Basilic.png': require('@src/assets/images/plants/Basilic.png'),
    'Bistorte.png': require('@src/assets/images/plants/Bistorte.png'),
    'Bleuet.png': require('@src/assets/images/plants/Bleuet.png'),
    'Boldo.png': require('@src/assets/images/plants/Boldo.png'),
    'Bougainvillea.png': require('@src/assets/images/plants/Bougainvillea.png'),
    'Bouleau.png': require('@src/assets/images/plants/Bouleau.png'),
    'Bourrache.png': require('@src/assets/images/plants/Bourrache.png'),
    'Brocoli.png': require('@src/assets/images/plants/Brocoli.png'),
} as const;

export type PlantImageName = keyof typeof plantImages;

export const getPlantImage = (imageName: PlantImageName) => {
    return plantImages[imageName];
};

export default plantImages;