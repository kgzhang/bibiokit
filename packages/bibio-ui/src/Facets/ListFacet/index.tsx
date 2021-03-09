import { EuiFacetButton, EuiFacetGroup, EuiTitle } from '@elastic/eui';
import React from 'react';
import { useSearchkit } from '@bibio/client';
export const ListFacet = ({ facet, loading }) => {
  const api = useSearchkit();

  const entries = facet.entries.map((entry) => (
    <EuiFacetButton
      style={{ height: '28px', marginTop: 0, marginBottom: 0 }}
      key={entry.id}
      quantity={entry.count}
      isSelected={api.isFilterSelected({ identifier: facet.identifier, value: entry.label })}
      onClick={() => {
        api.toggleFilter({ identifier: facet.identifier, value: entry.label });
        api.search();
      }}
      isLoading={loading}
    >
      {entry.label}
    </EuiFacetButton>
  ));

  return (
    <>
      <EuiTitle size='xxs'>
        <h3>{facet.label}</h3>
      </EuiTitle>
      <EuiFacetGroup>{entries}</EuiFacetGroup>
    </>
  );
};

ListFacet.DISPLAY = 'ListFacet';
