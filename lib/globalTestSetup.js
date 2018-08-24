import * as path from "path";
import * as fs from "fs";
import MongodbMemoryServer from "mongodb-memory-server";
const globalConfigPath = path.join(__dirname, "globalConfig.json");

// const mongod = new MongodbMemoryServer({
//   debug: true
// });

module.exports = async function() {
  const mongoConfig = {
    mongoDBName: "jest",
    // mongoUri: await mongod.getConnectionString()
    mongoUri: "mongodb://localhost:27017/jest"
  };

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  console.log("Config is written");

  // Set reference to mongod in order to close the server during teardown.
  // global.__MONGOD__ = mongod;
  process.env.MONGO_URL = mongoConfig.mongoUri;
};
