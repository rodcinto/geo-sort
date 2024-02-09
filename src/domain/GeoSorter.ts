import { List } from '../infrastructure/dataStructure/List.js';
import { DistanceContext } from './Distance/DistanceContext.js';
import { Haversine } from './Distance/strategies/Haversine.js';
import { LocationType } from './Location.type.js';
import { SortContext } from './Sorts/SortContext.js';
import { BruteSort } from './Sorts/Strategies/BruteSort.js';
import { Salesman } from './Sorts/Strategies/Salesman.js';

export class GeoSorter {
  bruteSortLocationsWithHarvesine(unsortedList: List<LocationType>): List<LocationType> {
    const distanceContext = new DistanceContext(new Haversine());
    const sortContext = new SortContext(new BruteSort(distanceContext, unsortedList));

    return sortContext.sortLocations();
  }

  sortWithSalesmanAndHarvesine(unsortedList: List<LocationType>): List<LocationType> {
    const distanceContext = new DistanceContext(new Haversine());
    const sortContext = new SortContext(new Salesman(distanceContext, unsortedList));

    return sortContext.sortLocations();
  }
}
