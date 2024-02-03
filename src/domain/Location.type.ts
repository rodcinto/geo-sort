import { CoordinatesType } from "./Coordinates.type.js";

type LocationType = {
  name: string;
  coordinates: CoordinatesType,
  origin?: boolean;
};

export { LocationType };
