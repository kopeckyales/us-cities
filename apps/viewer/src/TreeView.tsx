import { City, State } from "@us-cities/data-contracts";
import { useState } from "react";
import { CountyWithGetChildren, useStates, useFilteredTree } from "./hooks/useCities";
import { Node } from "./Node";

export const TreeView: React.FC = () => {
  const { data } = useStates();
  const [openState, setOpenState] = useState<string>();
  const [openCounty, setOpenCounty] = useState<string>();
  const [loadedCounties, setLoadedCounties] = useState<CountyWithGetChildren[]>([]);
  const [loadedCities, setLoadedCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useFilteredTree();

  const [searchResult, setSearchResult] = useState<State[]>();

  const doSearch = () => {
    search(searchTerm).then(setSearchResult);
  };

  const clearSearch = () => {
    setSearchResult(undefined);
    setSearchTerm("");
  };

  const clearOpenState = () => {
    setOpenState(undefined);
    setLoadedCounties([]);
    clearOpenCounty();
  };

  const clearOpenCounty = () => {
    setOpenCounty(undefined);
    setLoadedCities([]);
  };

  return (
    <div>
      At least 2 chars
      <div className="flex gap-2 sticky top-0 p-5 bg-white z-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-black border-2"
          placeholder="Search term"
        />
        <button onClick={doSearch} disabled={searchTerm.length < 2}>
          Search
        </button>
        <button onClick={clearSearch}>Clear</button>
      </div>
      <div>
        {searchResult !== undefined
          ? searchResult.map((state) => (
              <Node key={state.id} content={state.name} level={0} open>
                {state.counties.map((county) => (
                  <Node key={county.id} content={county.name} level={1} open>
                    {county.cities.map((city) => (
                      <Node key={city.id} content={city.name} level={2} />
                    ))}
                  </Node>
                ))}
              </Node>
            ))
          : data?.map((state) => (
              <Node
                key={state.id}
                content={state.name}
                level={0}
                onClick={() => {
                  if (openState === state.id) {
                    clearOpenState();
                    return;
                  }
                  state.getChildren().then(setLoadedCounties);
                  setOpenState(state.id);
                }}
                open={openState === state.id}
              >
                {loadedCounties.map((county) => (
                  <Node
                    key={county.id}
                    content={county.name}
                    level={1}
                    onClick={() => {
                      if (openCounty === county.id) {
                        clearOpenCounty();
                        return;
                      }
                      county.getChildren().then(setLoadedCities);
                      setOpenCounty(county.id);
                    }}
                    open={openCounty === county.id}
                  >
                    {loadedCities.map((city) => (
                      <Node key={city.id} content={city.name} level={2} />
                    ))}
                  </Node>
                ))}
              </Node>
            ))}
      </div>
    </div>
  );
};
