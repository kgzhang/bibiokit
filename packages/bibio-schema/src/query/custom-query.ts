import type QueryManager from '../core/query-manager';
import type { Query } from '../core/searchkit-request';
import type BaseQuery from './base-query';

interface CustomQueryConfig {
  queryFn: (query: string, queryManager?: QueryManager) => Query | null;
}

class CustomQuery implements BaseQuery {
  constructor(private config: CustomQueryConfig) {}

  getFilter(queryManager: QueryManager) {
    return this.config.queryFn(queryManager.getQuery());
  }
}

export default CustomQuery;
