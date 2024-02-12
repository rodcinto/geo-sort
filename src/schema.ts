import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Coordinates {
    lat: Float,
    lon: Float
  }
  type Location {
    name: String,
    coordinates: Coordinates
  }
  input LocationInput {
    name: String,
    lat: Float,
    lon: Float
  }
  type Query {
    sortLocations(locationsGiven: [LocationInput!]): [Location]
  }
`);

export { schema }
