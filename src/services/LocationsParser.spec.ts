import { assert } from 'chai';
import 'mocha';
import { LocationInputType } from '../dto/LocationInput.type.js';
import { LocationsParser } from './LocationsParser.js';
import { List } from '../infrastructure/dataStructure/List.js';
import { LocationType } from '../domain/Location.type.js';

describe('LocationsParser Tests', () => {
  it('Should obtain a list of parsed Locations', () => {
    const dresdenLocation: LocationInputType = {
      name: 'Dresden',
      lat: 51.0504,
      lon: 13.7373,
    };
    const bohnLocation: LocationInputType = {
      name: 'Bohn',
      lat: 51.1657,
      lon: 14.0173,
    };
    const leipzigLocation: LocationInputType = {
      name: 'Leipzig',
      lat: 51.3397,
      lon: 12.3731,
    };
    const berlinLocation: LocationInputType = {
      name: 'Berlin',
      lat: 52.52,
      lon: 13.405,
    };
    const rawLocations = [
      dresdenLocation,
      bohnLocation,
      leipzigLocation,
      berlinLocation,
    ];

    const locationsParser = new LocationsParser(rawLocations);
    const coordinatesList = locationsParser.buildParsedLocationsList();

    assert.instanceOf(coordinatesList, List<LocationType>);
    assert.containsAllKeys(
      coordinatesList.getCurrentValue(),
      ['name', 'coordinates']
    );
  });

  it('Should parse empty lists', () => {
    const locationsParser = new LocationsParser([]);
    const coordinatesList = locationsParser.buildParsedLocationsList();

    assert.instanceOf(coordinatesList, List<LocationType>);
    assert.isUndefined(coordinatesList.getCurrentValue());
  });
});
