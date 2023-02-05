import { CityRecord, CityTreeStructure, County, State } from "@us-cities/data-contracts";

/**
 * Converts cities list to tree structure with O(n) time complexity
 */
export function transformDataToTreeStructure(cities: CityRecord[]) {
  const stateMap = new Map<string, State>();
  const countyMap = new Map<string, County>();
  const result: CityTreeStructure = {
    states: [],
  };
  for (const { cityId, cityName, countyId, countyName, stateId, stateName } of cities) {
    if (!stateMap.has(stateId)) {
      const state: State = {
        id: stateId,
        name: stateName,
        counties: [],
      };
      stateMap.set(stateId, state);
      result.states.push(state);
    }
    if (!countyMap.has(countyId)) {
      const county: County = {
        id: countyId,
        name: countyName,
        cities: [],
      };
      countyMap.set(countyId, county);
      stateMap.get(stateId)?.counties.push(county);
    }
    countyMap.get(countyId)?.cities.push({
      id: cityId,
      name: cityName,
    });
  }
  return result;
}
