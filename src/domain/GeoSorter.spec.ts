import { assert } from 'chai';
import 'mocha';

import { GeoSorter } from './GeoSorter.js';
import { List } from '../infrastructure/dataStructure/List.js';
import { LocationType } from './Location.type.js';

describe('GeoSorter Tests', () => {
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
  const hamburgLocation: LocationType = {
    name: 'Hamburg',
    coordinates: {
      lat: 53.5511,
      lon: 9.9937,
    },
  };
  const stuttgartLocation: LocationType = {
    name: 'Stuttgart',
    coordinates: {
      lat: 48.8566,
      lon: 9.319,
    },
  };

  it('Should brute sort with Harvesine', () => {
    const locationsList = new List<LocationType>(stuttgartLocation);
    locationsList.append(berlinLocation);
    locationsList.append(leipzigLocation);
    locationsList.append(hamburgLocation);

    const geoSorter = new GeoSorter();
    const sortedList = geoSorter.bruteSortLocationsWithHarvesine(locationsList);

    sortedList.reset();
    assert.equal(hamburgLocation, sortedList.getCurrent());
    assert.equal(berlinLocation, sortedList.getNext());
    assert.equal(leipzigLocation, sortedList.getNext());
    assert.equal(stuttgartLocation, sortedList.getNext());
  });
});
