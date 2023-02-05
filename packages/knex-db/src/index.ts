import { join } from "path";
import { knex } from "knex";
import { CityRecord } from "@us-cities/data-contracts";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: join(__dirname, "../../../db.sqlite"),
  },
  useNullAsDefault: true,
});

export async function createCitiesTable() {
  if (!(await db.schema.hasTable("cities"))) {
    await db.schema.createTable("cities", (table) => {
      table.string("cityId").primary();
      table.string("cityName");
      table.string("stateId");
      table.string("stateName");
      table.string("countyId");
      table.string("countyName");
    });
  }
}

export const cities = () => db<CityRecord>("cities");
