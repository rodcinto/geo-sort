import { assert } from 'chai';
import 'mocha';

import { CoordinatesType } from '../Coordinates.type.js';
import { DistanceContext } from './DistanceContext.js';
import { Haversine } from './strategies/Haversine.js';
import { DistanceType } from './Distance.type.js';

describe('distanceCalculator Tests', () => {
  let leipzigCoord: CoordinatesType;
  let berlinCoord: CoordinatesType;
  let distanceContext: DistanceContext;

  beforeEach(() => {
    leipzigCoord = {
      lat: 51.3397,
      lon: 12.3731,
    };
    berlinCoord = {
      lat: 52.52,
      lon: 13.405,
    }
    distanceContext = new DistanceContext(new Haversine());
  });
  it('shoud return the correct distance between Leipzig and Berlin with Harvesine strategy', () => {
    const EXPECTED_DISTANCE: DistanceType = {
      km: 149.09617662378344,
    };

    const calculatedDistance = distanceContext.obtainDistanceBetween(leipzigCoord, berlinCoord);

    assert.deepEqual(calculatedDistance, EXPECTED_DISTANCE);
  });

  it('should return the same distance regardless the parameters order with Harvesine strategy', () => {
    const calcLeipzigToBerlin = distanceContext.obtainDistanceBetween(leipzigCoord, berlinCoord);
    const calcBerlinToLeipzig = distanceContext.obtainDistanceBetween(berlinCoord, leipzigCoord);

    assert.deepEqual(calcLeipzigToBerlin, calcBerlinToLeipzig);
  });
});
