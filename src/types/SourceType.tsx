// Définir l'interface pour une source
interface SourceItem {
    url: string;
    // Ajoutez d'autres propriétés si nécessaire
  }

  // Mettre à jour SourceType
  export interface SourceType {
    title: string;
    source: Array<string | SourceItem>;
  }
