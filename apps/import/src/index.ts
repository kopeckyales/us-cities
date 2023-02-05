import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { join } from "path";
import { logger } from "@us-cities/logger";
import { cities, createCitiesTable } from "@us-cities/knex-db";
import { CityRecord } from "@us-cities/data-contracts";

type SourceData = {
  city: string;
  id: string;
  state_id: string;
  state_name: string;
  county_fips: string;
  county_name: string;
};

export async function loadCities() {
  const csvPath = join(__dirname, "..", "data", "uscities.csv");
  const parser = createReadStream(csvPath).pipe(
    parse({
      columns: true,
    })
  );

  await createCitiesTable();

  let totalProcessed = 0;
  let batch: CityRecord[] = [];
  let row: SourceData;
  for await (row of parser) {
    batch.push({
      cityId: row.id,
      cityName: row.city,
      countyId: row.county_fips,
      countyName: row.county_name,
      stateId: row.state_id,
      stateName: row.state_name,
    });
    totalProcessed++;
    // 500 is SQLite limitation for compound SELECT
    if (batch.length % 500 === 0) {
      await cities().insert(batch);
      logger.info("%d entries processed", totalProcessed);
      batch = [];
    }
  }

  await cities().insert(batch);
  logger.info("all entries imported");
}

loadCities().then(() => process.exit());
