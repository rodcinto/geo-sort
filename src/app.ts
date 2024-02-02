import express, { Express } from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Location } from './domain/Location.type.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

const schema = buildSchema(`
  type Location {
    name: String,
    lat: Float,
    lng: Float,
    origin: Boolean
  }
  input LocationInput {
    name: String,
    lat: Float,
    lng: Float,
    origin: Boolean
  }
  type Query {
    sortLocations(locations: [LocationInput!]): [Location]
  }
`);

const root = {
  sortLocations: ({ locations }: { locations: Location[] }) => {
    console.log('Locations received', locations);

    const leipzigLocation: Location = {
      name: 'Leipzig',
      lat: 51.3397,
      lon: 12.3731,
      origin: true,
    };
    const berlinLocation: Location = {
      name: 'Berlin',
      lat: 52.52,
      lon: 13.405,
    };

    return [leipzigLocation, berlinLocation];
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
