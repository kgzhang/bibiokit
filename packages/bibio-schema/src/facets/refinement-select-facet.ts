import { ValueFilter } from './../core/query-manager';
import { BaseFacet, FacetOptions } from './base-facets';
import { createRegexQuery } from './utils';

interface RefinementSelectFacetConfig {
  identifier: string;
  field: string;
  size?: number;
  label: string;
  display?: 'ListFacet' | 'ComboFacet' | string;
  multipleSelect?: boolean;
}

class RefinementSelectFacet implements BaseFacet {
  public excludeOwnFilters = false;

  constructor(public config: RefinementSelectFacetConfig) {
    this.excludeOwnFilters = this.config.multipleSelect;
  }
  getLabel(): string {
    return this.config.label;
  }

  getIdentifier() {
    return this.config.identifier;
  }

  getFilters(filters: ValueFilter[]) {
    const condition = this.excludeOwnFilters ? 'should' : 'must';
    return {
      bool: {
        [condition]: filters.map((term) => ({ term: { [this.config.field]: term.value } })),
      },
    };
  }

  getAggregation(overrides: FacetOptions) {
    return {
      [this.getIdentifier()]: {
        terms: {
          field: this.config.field,
          size: overrides?.size || this.config.size || 5,
          ...(overrides?.query ? { include: createRegexQuery(overrides.query) } : {}),
        },
      },
    };
  }

  getSelectedFilter(filterSet) {
    return {
      identifier: this.getIdentifier(),
      id: `${this.getIdentifier()}_${filterSet.value}`,
      label: this.getLabel(),
      display: this.config.display || 'ListFacet',
      type: 'ValueSelectedFilter',
      value: filterSet.value,
    };
  }

  transformResponse(response: any) {
    return {
      identifier: this.getIdentifier(),
      label: this.getLabel(),
      display: this.config.display || 'ListFacet',
      type: 'RefinementSelectFacet',
      entries: response.buckets.map((entry) => ({
        id: `${this.getIdentifier()}_${entry.key}`,
        label: entry.key,
        count: entry.doc_count,
      })),
    };
  }
}

export default RefinementSelectFacet;
