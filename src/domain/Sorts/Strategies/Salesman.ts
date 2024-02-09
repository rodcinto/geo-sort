import { LocationType } from '../../../domain/Location.type.js';
import { List } from '../../../infrastructure/dataStructure/List.js';
import { LocationAwareInterface } from './LocationAware.interface.js';
import { DistanceContext } from '../../../domain/Distance/DistanceContext.js';

export class Salesman implements LocationAwareInterface {
  constructor(
    private readonly distanceContext: DistanceContext,
    private readonly unsortedList: List<LocationType>,
  ) {}

  private calculateWeightFor(path: List<LocationType>): number {
    let weight = 0;
    path.reset();
    let currentLocation = path.getCurrent();
    while (currentLocation) {
      const nextLocation = path.getNext();
      if (nextLocation) {
        weight += this.distanceContext.obtainDistanceBetween(currentLocation.coordinates, nextLocation.coordinates).km;
      }
      currentLocation = nextLocation;
    }
    return weight;
  }

  sort(): List<LocationType> {
    const permutations = this.unsortedList.generatePermutations();
    const weightHash = permutations.map((perm: List<LocationType>) => {
      return {
        path: perm,
        weight: this.calculateWeightFor(perm),
      };
    });
    // console.log('Weigth Hash', weightHash);

    const minWeight = [...weightHash].reduce((min, current) => Math.min(min, current.weight), Infinity);
    // console.log('Min Weight', minWeight);

    const reducedMap = weightHash.filter(
      (value: { path: List<LocationType>; weight: number }) => value.weight === minWeight,
    );
    // console.log('reducedMap', reducedMap);

    const shortestPath = reducedMap.pop()?.path;

    if (!shortestPath) {
      return permutations[0]; // A little fallback here.
    }

    return shortestPath;
  }
}
