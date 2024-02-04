import { assert } from 'chai';
import 'mocha';

import { LocationType } from '../../../domain/Location.type.js';
import { List } from '../../../infrastructure/dataStructure/List.js';
import { BruteSort } from './BruteSort.js';
import { DistanceContext } from '../../../domain/Distance/DistanceContext.js';
import { Haversine } from '../../../domain/Distance/strategies/Haversine.js';

describe('BruteSort Tests', () => {
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

  it('Should find closest location with Harvesine', () => {
    const locationsList = new List<LocationType>(dresdenLocation);
    locationsList.append(halleLocation);
    locationsList.append(leipzigLocation);
    locationsList.append(berlinLocation);

    const bruteSorter = new BruteSort(distanceContext, locationsList);

    assert.equal(halleLocation.name, bruteSorter.pickClosestLocationTo(leipzigLocation).name);
  });
  it('Should find the most distant points with Harvesine', () => {
    const locationsList = new List<LocationType>(dresdenLocation);
    locationsList.append(halleLocation);
    locationsList.append(leipzigLocation);
    locationsList.append(berlinLocation);
    locationsList.append(frankfurtLocation);

    const bruteSorter = new BruteSort(distanceContext, locationsList);

    const expectedExtremities = {
      initial: frankfurtLocation,
      final: berlinLocation,
    };
    assert.deepEqual(expectedExtremities, bruteSorter.findExtremities());
  });
});
