import { cities } from "@us-cities/knex-db";
import { transformDataToTreeStructure } from "@us-cities/city-tree";

async function printTree() {
  const data = await cities().select("*");
  const tree = transformDataToTreeStructure(data);

  for (const state of tree.states) {
    console.log(`|- ${state.name}`);
    for (const county of state.counties) {
      console.log(`|  |- ${county.name}`);
      for (const city of county.cities) {
        console.log(`|  |  |- ${city.name}`);
      }
    }
  }
}

printTree().then(() => process.exit());
