import { CoordinatesType } from 'src/domain/Coordinates.type.js';
import { DistanceStrategyInterface } from './DistanceStrategy.interface.js';

export class Haversine implements DistanceStrategyInterface {
  calculateDistance(coord1: CoordinatesType, coord2: CoordinatesType): number {
    const EARTH_RADIUS_KM = 6371;

    const radLat1 = (coord1.lat * Math.PI) / 180;
    const radLon1 = (coord1.lon * Math.PI) / 180;
    const radLat2 = (coord2.lat * Math.PI) / 180;
    const radLon2 = (coord2.lon * Math.PI) / 180;

    const deltaLat = radLat2 - radLat1;
    const deltaLon = radLon2 - radLon1;

    // Haversine formula: a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
    const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;

    // c = 2 * atan2(√a, √(1-a))
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKM = EARTH_RADIUS_KM * c;

    return distanceKM;
  }
}
