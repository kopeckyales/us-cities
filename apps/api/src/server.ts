import cors from "@fastify/cors";
import fastify from "fastify";
import { City, County, State } from "@us-cities/data-contracts";
import { transformDataToTreeStructure } from "@us-cities/city-tree";
import { cities } from "@us-cities/knex-db";

export function buildServer() {
  const server = fastify({
    logger: true,
  });
  server.register(cors, {
    origin: true,
  });

  server.register(async function (server) {
    server.get<{
      Reply: State[];
    }>("/states", async (request, response) => {
      const data = await cities().select("*");
      const tree = transformDataToTreeStructure(data);
      return response.send(
        tree.states.map((x) => ({
          id: x.id,
          name: x.name,
          counties: [],
        }))
      );
    });

    server.get<{
      Reply: County[];
      Params: { stateId: string };
    }>("/states/:stateId/counties", async (request, response) => {
      console.log(request.query);
      const stateId = request.params.stateId;
      console.log(cities().select("*").where("stateId", "=", stateId).toSQL().toNative());
      const data = await cities().select("*").where("stateId", "=", stateId);
      const tree = transformDataToTreeStructure(data);

      return response.send(
        tree.states[0].counties.map((x) => ({
          id: x.id,
          name: x.name,
          cities: [],
        }))
      );
    });

    server.get<{
      Reply: City[];
      Params: { countyId: string };
    }>("/counties/:countyId/cities", async (request, response) => {
      const countyId = request.params.countyId;
      const data = await cities().select("*").where("countyId", "=", countyId);
      const tree = transformDataToTreeStructure(data);

      return response.send(
        tree.states[0].counties[0].cities.map((x) => ({
          id: x.id,
          name: x.name,
        }))
      );
    });

    server.get<{
      Reply: State[];
      Params: { term: string };
    }>("/search/:term", async (request, response) => {
      const term = request.params.term;
      const data = await cities()
        .select("*")
        .where("countyName", "like", `%${term}%`)
        .orWhere("stateName", "like", `%${term}%`)
        .orWhere("cityName", "like", `%${term}%`);
      const tree = transformDataToTreeStructure(data);

      return response.send(tree.states);
    });
  });
  return server;
}
