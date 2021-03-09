import { splitComma, toDate, toNumber, withConfig } from '@bibio/cli';

import bikeData from '../data/bike.json';

withConfig({
  index: 'bike_hire_station',
  host: 'http://localhost:9200',
  source: bikeData,
  fields: [
    {
      fieldName: 'id',
      stored: true,
      sourceOptions: {
        path: 'id',
      },
    },
    {
      fieldName: 'name',
      stored: true,
      searchable: true,
      sourceOptions: {
        path: 'name',
      },
    },
    {
      fieldName: 'location',
      stored: true,
      facet: false,
      searchable: false,
      type: 'geo_point',
      sourceOptions: {
        path: 'latitude',
        transform: (str, doc) => {
          return `${str}, ${doc['longitude']}`;
        },
      },
    },
  ],
});
