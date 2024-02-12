import { GeoSorter } from "../domain/GeoSorter.js";
import { LocationInputType } from "../dto/LocationInput.type.js";
import { LocationsParser } from "../services/LocationsParser.js";

const sortLocations = ({ locationsGiven }: { locationsGiven: LocationInputType[] }) => {
  const locationsParser = new LocationsParser(locationsGiven);
  const unsortedLocations = locationsParser.buildParsedLocationsList();

  const geoSorter = new GeoSorter();
  const sortedList = geoSorter.sortWithSalesmanAndHarvesine(unsortedLocations);

  sortedList.reset();

  const response = [sortedList.getCurrent()];
  while (sortedList.getNext()) {
    response.push(sortedList.getCurrent());
  }

  return response;
}

export { sortLocations };
