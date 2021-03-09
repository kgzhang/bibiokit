export interface ValueFilter {
  identifier: string;
  value: string;
}

export interface RangeFilter {
  identifier: string;
  min: number;
  max: number;
}

export interface DateRangeFilter {
  identifier: string;
  dateMin: string;
  dateMax: string;
}

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface GeoBoundingBoxFilter {
  identifier: string;
  geoBoundingBox: {
    topLeft: GeoPoint;
    bottomRight: GeoPoint;
  };
}

export type MixedFilter = ValueFilter | RangeFilter | DateRangeFilter | GeoBoundingBoxFilter;

export default class QueryManager {
  constructor(private filters: MixedFilter[], private query: string) {}

  hasFilters(): boolean {
    return this.filters && this.filters.length > 0;
  }

  hasQuery(): boolean {
    return !!(this.query && this.query.length > 0);
  }

  getQuery(): string {
    return this.query;
  }

  getFilters(): MixedFilter[] {
    return this.hasFilters() ? this.filters : [];
  }

  getFiltersById(id: string): MixedFilter[] {
    if (!this.hasFilters()) {
      return [];
    }

    const idFilters = this.filters.filter((filter) => filter.identifier === id);
    return idFilters.length > 0 ? idFilters : [];
  }
}
