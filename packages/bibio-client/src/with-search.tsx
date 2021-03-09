import React from 'react'

import { SearchkitClient,SearchkitProvider } from './search'

const defaultSearchkitClient = () => new SearchkitClient()
let _client: SearchkitClient | null = null

export default (Page: JSX.Element, createSearchkitClient = defaultSearchkitClient) => {
  const getClient = () => {
    if (typeof window === 'undefined') {
      return createSearchkitClient()
    }

    if (!_client) {
      _client = createSearchkitClient()
    }

    return _client
  }

  return () => (
    <SearchkitProvider client={getClient()}>
      <Page />
    </SearchkitProvider>
  )
}
