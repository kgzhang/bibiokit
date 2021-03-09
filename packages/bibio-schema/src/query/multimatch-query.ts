import type QueryManager from '../core/query-manager';
import type BaseQuery from './base-query';

interface MultiMatchQueryConfig {
  field: string[];
}

class MultiMatchQuery implements BaseQuery {
  constructor(private config: MultiMatchQueryConfig) {}

  getFilter(queryManager: QueryManager) {
    if (queryManager.hasQuery()) {
      return {
        bool: {
          must: [
            {
              multi_match: {
                query: queryManager.getQuery(),
                filelds: this.config.field,
              },
            },
          ],
        },
      };
    }

    return null;
  }
}

export default MultiMatchQuery;
