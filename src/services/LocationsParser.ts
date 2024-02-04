import { LocationType } from '../domain/Location.type.js';
import { LocationInputType } from '../dto/LocationInput.type.js';
import { List } from '../infrastructure/dataStructure/List.js';

export class LocationsParser {
  private locations: LocationType[];

  constructor(readonly locationsInput: LocationInputType[]) {
    this.locations = locationsInput.map((input) => ({
      name: input.name,
      coordinates: {
        lat: input.lat,
        lon: input.lon,
      },
    }));
  }

  buildParsedLocationsList(): List<LocationType> {
    const locationsList = this.locations.reduce((acc: List<LocationType>, location: LocationType) => {
      acc.append(location);
      return acc;
    }, new List<LocationType>());

    locationsList.reset();

    return locationsList;
  }
}
