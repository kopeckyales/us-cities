import { useQuery } from "react-query";
import { City, County, State } from "@us-cities/data-contracts";
import { useCallback } from "react";

export type CountyWithGetChildren = County & {
  getChildren: () => Promise<City[]>;
};

export const useStates = () => {
  const { data } = useQuery(["states"], async () => {
    const response = await fetch("http://localhost:3000/states");
    const state = (await response.json()) as State[];
    return state.map((state) => ({
      ...state,
      getChildren: async () => {
        const response = await fetch(`http://localhost:3000/states/${state.id}/counties`);
        const counties = (await response.json()) as County[];
        return counties.map((county) => ({
          ...county,
          getChildren: async () => {
            const response = await fetch(`http://localhost:3000/counties/${county.id}/cities`);
            const cities = (await response.json()) as City[];
            return cities;
          },
        }));
      },
    }));
  });

  return { data };
};

export const useFilteredTree = () => {
  const search = useCallback(async (term: string) => {
    const response = await fetch(`http://localhost:3000/search/${term}`);
    return (await response.json()) as State[];
  }, []);

  return { search };
};
