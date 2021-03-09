import type { RequestBody } from '@elastic/elasticsearch/lib/Transport';

import QueryManager, { MixedFilter } from '../core/query-manager';
import SearchkitRequest from '../core/searchkit-request';
import type { BaseFacet } from '../facets';
import type { BaseFilter } from '../filters';
import type { BaseQuery } from '../query';

export interface SortingOption {
  id: string;
  label: string;
  field: any;
  defaultOption?: boolean;
}

export interface SearchkitConfig {
  host: string;
  index: string;
  sortOptions?: SortingOption[];
  hits: {
    fields: string[];
  };
  query?: BaseQuery;
  facets?: BaseFacet[];
  filters?: BaseFilter[];
  postProcessRequest?: (body: RequestBody) => RequestBody;
}

export interface ResultsResolverParameters {
  filters: MixedFilter[];
  query: string;
}

export default async (parent, parameters: ResultsResolverParameters, ctx, info) => {
  try {
    const returnTypeName = info.returnType.name;
    const config = ctx.searchkit.configs[returnTypeName];
    const skConfig = {
      sortOptions: [],
      ...config,
    };
    const baseFilters = ctx.searchkit.baseFilters[returnTypeName]
      ? ctx.searchkit.baseFilters[returnTypeName](parent, parameters, ctx, info)
      : [];
    const queryManager = new QueryManager(parameters.filters, parameters.query);
    const skRequest = new SearchkitRequest(queryManager, skConfig, baseFilters);

    return {
      searchkit: {
        skRequest: skRequest,
        queryManager: queryManager,
        config: skConfig,
        hitType: ctx.searchkit.hitTypeMappings[returnTypeName],
      },
    };
  } catch (error) {
    console.log(error);
  }
};
