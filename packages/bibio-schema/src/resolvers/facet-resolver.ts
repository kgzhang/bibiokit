import { getAggregationsFromFacets, getFacetsFromResponse } from '../core/facets-fns';
import type QueryManager from '../core/query-manager';
import type SearchkitRequest from '../core/searchkit-request';
import type { SearchkitConfig } from './result-resolver';
export interface FacetResolverParameters {
  identifier: string;
  query: string;
  size: number;
}

export default async (parent, parameters: FacetResolverParameters, ctx) => {
  const queryManager: QueryManager = parent.searchkit.queryManager;
  const config: SearchkitConfig = parent.searchkit.config;
  const skRequest: SearchkitRequest = parent.searchkit.skRequest;
  const combinedFilters = [...(config.facets || []), ...(config.filters || [])];

  const facet =
    combinedFilters &&
    combinedFilters.find((facet) => facet.getIdentifier() === parameters.identifier);

  if (!facet) {
    return null;
  }

  try {
    const aggs = getAggregationsFromFacets(
      queryManager,
      {
        [facet.getIdentifier()]: {
          query: parameters.query,
          size: parameters.size,
        },
      },
      [facet],
    );
    const response = await skRequest.search(aggs);
    const facets = getFacetsFromResponse([facet], response);

    return facets[0];
  } catch {
    throw new Error('error when fetch facet');
  }
};
