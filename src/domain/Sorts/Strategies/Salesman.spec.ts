import { assert } from 'chai';
import 'mocha';
import { DistanceContext } from '../../../domain/Distance/DistanceContext.js';
import { Haversine } from '../../../domain/Distance/strategies/Haversine.js';
import { LocationType } from '../../../domain/Location.type.js';
import { List } from '../../../infrastructure/dataStructure/List.js';
import { Salesman } from './Salesman.js';

describe('Salesman Tests', () => {
  const dresdenLocation: LocationType = {
    name: 'Dresden',
    coordinates: {
      lat: 51.0504,
      lon: 13.7373,
    },
  };
  const halleLocation: LocationType = {
    name: 'Halle',
    coordinates: {
      lat: 51.482,
      lon: 11.969,
    },
  };
  const leipzigLocation: LocationType = {
    name: 'Leipzig',
    coordinates: {
      lat: 51.3397,
      lon: 12.3731,
    },
  };
  const berlinLocation: LocationType = {
    name: 'Berlin',
    coordinates: {
      lat: 52.52,
      lon: 13.405,
    },
  };
  const frankfurtLocation: LocationType = {
    name: 'Frankfurt',
    coordinates: {
      lat: 50.1109,
      lon: 8.6821,
    },
  };

  const distanceContext = new DistanceContext(new Haversine());

  it('Should find closest location with Salesman and Harvesine', () => {
    const locationsList = new List<LocationType>(dresdenLocation);
    locationsList.append(frankfurtLocation);
    locationsList.append(halleLocation);
    locationsList.append(leipzigLocation);
    locationsList.append(berlinLocation);

    const salesmanSorter = new Salesman(distanceContext, locationsList);

    const shortestPath = salesmanSorter.sort();

    // shortestPath.reset();
    // let currentLocation = shortestPath.getCurrent();
    // while (currentLocation) {
    //   console.log('Location', currentLocation);
    //   currentLocation = shortestPath.getNext();
    // }

    shortestPath.reset();
    assert.equal(shortestPath.getCurrent(), berlinLocation);
  });
});
