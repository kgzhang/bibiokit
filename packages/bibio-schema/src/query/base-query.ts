import type QueryManager from '../core/query-manager';
import type { Query } from '../core/searchkit-request';

export interface BaseQuery {
  getFilter: (queryManager: QueryManager) => Query | null;
}
