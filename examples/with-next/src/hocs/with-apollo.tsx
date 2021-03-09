import { ApolloClient,ApolloProvider, InMemoryCache } from "@apollo/client"
import withApollo from "next-with-apollo"
import React from "react"
export default withApollo(
    ({ initialState }) => {
      const cache = new InMemoryCache({
        typePolicies: {
          FacetSetEntry: {
            keyFields: false
          }
        }
        // possibleTypes: introspectionResult.possibleTypes
      }).restore(initialState || {})
  
      if (typeof window !== 'undefined') {window.cache = cache}
  
      return new ApolloClient({
        uri: `/api/graphql`,
        cache
      })
    },
    {
      render: ({ Page, props }) => (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    }
  )
  