import type QueryManager from '../core/query-manager';
import type SearchkitRequest from '../core/searchkit-request';
import { getAggregationsFromFacets, getFacetsFromResponse } from './../core/facets-fns';
import type { SearchkitConfig } from './result-resolver';

export default async (parent, {}, ctx) => {
  const queryManager: QueryManager = parent.searchkit.queryManager;
  const config: SearchkitConfig = parent.searchkit.config;
  const skRequest: SearchkitRequest = parent.searchkit.skRequest;

  if (!config.facets) {
    return null;
  }

  try {
    const aggs = getAggregationsFromFacets(queryManager, {}, config.facets);
    const results = await skRequest.search(aggs);
    const facets = getFacetsFromResponse(config.facets, results);
    return facets;
  } catch {
    throw new Error('error in facets');
  }
};
