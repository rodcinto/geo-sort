import express, { Express } from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { LocationsParser } from './services/LocationsParser.js';
import { LocationInputType } from './dto/LocationInput.type.js';
import { GeoSorter } from './domain/GeoSorter.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

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

const root = {
  sortLocations: ({ locationsGiven }: { locationsGiven: LocationInputType[] }) => {
    const locationsParser = new LocationsParser(locationsGiven);
    const unsortedLocations = locationsParser.buildParsedLocationsList();

    const geoSorter = new GeoSorter();
    const sortedList = geoSorter.sortWithSalesmanAndHarvesine(unsortedLocations);

    sortedList.reset();

    const response = [sortedList.getCurrent()];
    while (sortedList.getNext()) {
      response.push(sortedList.getCurrent());
    }

    return response;
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
