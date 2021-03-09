import type { MixedFilter } from '../core/query-manager';

export interface BaseFilter {
  excludeOwnFilters: boolean;
  getIdentifier: () => string;
  getLabel: () => string;
  getFilters: (filters: MixedFilter[]) => any;
  getSelectedFilter: (filterSet: any) => any;
}
