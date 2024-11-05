export interface CatalogTitle {
  catalogueId: string; // Must match spelling of obj from REST API, therefore not catalogId
  name: string;
  startDate?: string;
  endDate?: string;
  publisher?: string;
  publisherPlace?: string;
  language?: string;
}
