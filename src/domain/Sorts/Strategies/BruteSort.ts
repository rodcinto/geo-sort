import { LocationType } from "../../../domain/Location.type.js";
import { DistanceContext } from "../../../domain/Distance/DistanceContext.js";
import { List } from "../../../infrastructure/dataStructure/List.js";
import { LocationAwareInterface } from "./LocationAware.interface.js";

type ExtremetyLocationsType = {
  initial: LocationType | undefined;
  final: LocationType | undefined;
}

// A not so charming algorithm that will roughly find the best route.
export class BruteSort implements LocationAwareInterface {
  constructor(
    private readonly distanceContext: DistanceContext,
    private readonly unsortedList: List<LocationType>,
  ) {}

  sort(): List<LocationType> {
    const extremities = this.findExtremities();
    const sortedList = new List<LocationType>(extremities.initial);

    this.unsortedList.reset();
    let closestLocation: LocationType;

    while (this.unsortedList.getCurrent()) {
      closestLocation = this.pickClosestLocationTo(sortedList.getCurrent() as LocationType);
      sortedList.append(closestLocation);
    }

    sortedList.append(extremities.final as LocationType);

    return sortedList;
  }

  pickClosestLocationTo(givenLocation: LocationType): LocationType {
    const EARTH_CIRCUMFERENCE_KM = 40075;

    this.unsortedList.reset();

    // Greedy
    let closestLocation = this.unsortedList.getCurrent() as LocationType;
    let shortestDistance = EARTH_CIRCUMFERENCE_KM;

    let nextLocation = this.unsortedList.getCurrent();
    let nextDistance: number;
    while(nextLocation) {
      if (givenLocation.name === nextLocation.name) {
        nextLocation = this.unsortedList.getNext();
        continue;
      }

      nextDistance = this.distanceContext.obtainDistanceBetween(
        givenLocation.coordinates,
        nextLocation.coordinates
      ).km;
      if (shortestDistance > nextDistance) {
        shortestDistance = nextDistance;
        closestLocation = nextLocation;
      }

      nextLocation = this.unsortedList.getNext();
    }

    this.unsortedList.reset();
    nextLocation = this.unsortedList.getCurrent();
    while(nextLocation) {
      if (nextLocation === closestLocation) {
        return this.unsortedList.extract() as LocationType;
      }
      nextLocation = this.unsortedList.getNext();
    }

    return closestLocation;
  }

  findExtremities(): ExtremetyLocationsType {
    let maxDistance = 0;
    let evaluatingDistanceKm = 0;
    let initialExtremity: LocationType | undefined;
    let finalExtremity: LocationType | undefined;

    this.unsortedList.reset();

    let nextReference = this.unsortedList.getCurrent();
    let nextPosition = nextReference;
    let prevPosition: LocationType | undefined;
    let updateReference: LocationType | undefined;

    while(nextReference) {
      while(nextPosition) {
        evaluatingDistanceKm = this.distanceContext.obtainDistanceBetween(
            nextReference.coordinates,
            nextPosition.coordinates
          ).km;
        if (maxDistance <= evaluatingDistanceKm) {
          maxDistance = evaluatingDistanceKm;
          initialExtremity = nextReference;
          finalExtremity = nextPosition;
        }

        prevPosition = this.unsortedList.getCurrent();
        nextPosition = this.unsortedList.getNext();
        if (nextReference === prevPosition) {
          updateReference = nextPosition;
        }
      }
      this.unsortedList.reset();
      nextPosition = this.unsortedList.getCurrent();
      nextReference = updateReference;
    }

    this.unsortedList.reset();
    let nextLocation = this.unsortedList.getCurrent();
    while(nextLocation) {
      if (nextLocation === initialExtremity || nextLocation === finalExtremity) {
        this.unsortedList.extract();
        this.unsortedList.reset();
      }
      nextLocation = this.unsortedList.getNext();
    }

    return {initial: initialExtremity, final: finalExtremity};
  }
}
