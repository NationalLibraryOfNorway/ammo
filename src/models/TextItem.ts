import {NewspaperMetadata} from '@/models/NewspaperMetadata';

// TODO: This interface is likely to change due to required changes in the production line API
export interface TextItem {
  id: string;
  extractedMetadata?: NewspaperMetadata;
  metadata?: NewspaperMetadata;
}