import { List } from '../../infrastructure/dataStructure/List.js';
import { LocationAwareInterface } from './Strategies/LocationAware.interface.js';
import { LocationType } from '../Location.type.js';

export class SortContext {
  constructor(private readonly sortStrategy: LocationAwareInterface) {}

  sortLocations(): List<LocationType> {
    return this.sortStrategy.sort();
  }
}
