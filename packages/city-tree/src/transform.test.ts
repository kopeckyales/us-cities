import { CityTreeStructure } from "@us-cities/data-contracts";
import { transformDataToTreeStructure } from "./transform";

test("It should return tree", () => {
  const result = transformDataToTreeStructure([
    { cityId: "1", cityName: "One", countyId: "1", countyName: "One", stateId: "1", stateName: "One" },
    { cityId: "2", cityName: "Two", countyId: "1", countyName: "One", stateId: "1", stateName: "One" },
    { cityId: "3", cityName: "Three", countyId: "2", countyName: "Two", stateId: "2", stateName: "Two" },
    { cityId: "4", cityName: "Four", countyId: "3", countyName: "Three", stateId: "2", stateName: "Two" },
  ]);
  const expected: CityTreeStructure = {
    states: [
      {
        id: "1",
        name: "One",
        counties: [
          {
            id: "1",
            name: "One",
            cities: [
              {
                id: "1",
                name: "One",
              },
              {
                id: "2",
                name: "Two",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Two",
        counties: [
          {
            id: "2",
            name: "Two",
            cities: [
              {
                id: "3",
                name: "Three",
              },
            ],
          },
          {
            id: "3",
            name: "Three",
            cities: [
              {
                id: "4",
                name: "Four",
              },
            ],
          },
        ],
      },
    ],
  };
  expect(result).toEqual(expected);
});
