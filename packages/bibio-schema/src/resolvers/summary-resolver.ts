import type QueryManager from '../core/query-manager';
import type SearchkitRequest from '../core/searchkit-request';
import type { SearchkitConfig } from './result-resolver';

export default async (parent, {}, ctx) => {
  const queryManager: QueryManager = parent.searchkit.queryManager;
  const config: SearchkitConfig = parent.searchkit.config;
  const skRequest: SearchkitRequest = parent.searchkit.skRequest;

  try {
    const results = await skRequest.search({});
    const combinedFilters = [...(config.facets || []), ...(config.filters || [])];
    return {
      total:
        typeof results.hits.total.value === 'number'
          ? results.hits.total.value
          : results.hits.total,
      query: queryManager.getQuery(),
      sortOptions: config.sortOptions.map((sortOption) => ({
        id: sortOption.id,
        label: sortOption.label,
      })),
      appliedFilters: queryManager.getFilters().map((filterSet) => {
        const facetConfig = combinedFilters.find(
          (facet) => facet.getIdentifier() === filterSet.identifier,
        );
        return facetConfig.getSelectedFilter(filterSet);
      }, []),
    };
  } catch (error) {
    console.log(error);
  }
};
