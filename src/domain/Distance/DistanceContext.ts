import { CoordinatesType } from '../Coordinates.type.js';
import { DistanceType } from './Distance.type.js';
import { DistanceStrategyInterface } from './strategies/DistanceStrategy.interface.js';

export class DistanceContext {
  constructor(private readonly distanceStrategy: DistanceStrategyInterface) {}

  public obtainDistanceBetween(coord1: CoordinatesType, coord2: CoordinatesType): DistanceType {
    const result = this.distanceStrategy.calculateDistance(coord1, coord2);
    return {
      km: result,
    };
  }
}
