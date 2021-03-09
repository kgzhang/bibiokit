import { EuiSpacer } from '@elastic/eui'
import React from 'react'

import { ComboBoxFacet } from '../ComboBoxFacet'
import { DateRangeFacet } from '../DateRangeFacet'
import { ListFacet } from '../ListFacet'
import { RangeSliderFacet } from '../RangeSliderFacet'

export const FacetsList = (components = []) => {
  const componentTypeMap = [
    ...components,
    ListFacet,
    ComboBoxFacet,
    RangeSliderFacet,
    DateRangeFacet
  ].reduce((sum, component) => {
    sum[component.DISPLAY] = component
    return sum
  }, {})
  return ({ data, loading }) => (
    <>
      {data?.facets.map((facet) => {
        const Component = componentTypeMap[facet.display]

        if (!Component) {
          throw new Error(`${facet.display  } not available`)
        }

        return (
          <div key={facet.identifier}>
            <Component facet={facet} loading={loading} />
            <EuiSpacer size="l" />
          </div>
        )
      })}
    </>
  )
}
