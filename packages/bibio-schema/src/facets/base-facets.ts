import type { MixedFilter } from '../core/query-manager';

export interface FacetOptions {
  size: number;
  query: string;
}

export interface BaseFacet {
  excludeOwnFilters: boolean;
  getIdentifier: () => string;
  getLabel: () => string;
  getAggregation: (overrides: FacetOptions) => any;
  getFilters: (filters: MixedFilter[]) => any;
  transformResponse: (response: any) => any;
  getSelectedFilter: (filterSet: any) => any;
}
