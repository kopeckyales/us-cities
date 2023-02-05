export type CityRecord = {
  stateId: string;
  stateName: string;
  countyId: string;
  countyName: string;
  cityId: string;
  cityName: string;
};

export type City = {
  id: string;
  name: string;
};

export type County = {
  id: string;
  name: string;
  cities: City[];
};

export type State = {
  id: string;
  name: string;
  counties: County[];
};

export type CityTreeStructure = {
  states: State[];
};
