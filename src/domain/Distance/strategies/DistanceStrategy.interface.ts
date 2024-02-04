import { CoordinatesType } from 'src/domain/Coordinates.type.js';
export interface DistanceStrategyInterface {
  calculateDistance(coord1: CoordinatesType, coord2: CoordinatesType): number;
}
