import { LocationType } from '../../Location.type.js';
import { List } from '../../../infrastructure/dataStructure/List.js';

export interface LocationAwareInterface {
  sort(): List<LocationType>;
}
