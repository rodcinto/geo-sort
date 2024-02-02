import { assert } from 'chai';
import 'mocha';

import { Coordinates } from 'src/domain/Coordinates.type.js';
import { distanceCalculator } from './distanceCalculator.js';

describe('distanceCalculator Tests', () => {
  let leipzigCoord: Coordinates;
  let berlinCoord: Coordinates;

  beforeEach(() => {
    leipzigCoord = {
      lat: 51.3397,
      lon: 12.3731,
    };
    berlinCoord = {
      lat: 52.52,
      lon: 13.405,
    }
  });
  it('shoud return the correct distance between Leipzig and Berlin', () => {
    const EXPECTED_DISTANCE = 149.09617662378344;

    const calculatedDistance = distanceCalculator(leipzigCoord, berlinCoord);
    assert.equal(calculatedDistance, EXPECTED_DISTANCE);
  });

  it('should return the same distance regardless the parameters order', () => {
    const calcLeipzigToBerlin = distanceCalculator(leipzigCoord, berlinCoord);
    const calcBerlinToLeipzig = distanceCalculator(berlinCoord, leipzigCoord);
    assert.equal(calcLeipzigToBerlin, calcBerlinToLeipzig);
  });
});
