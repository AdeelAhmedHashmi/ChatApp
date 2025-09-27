import app from "./app";
import http from "node:http";
import VAR from "./config/constants";
import dbConnection from "./db/db";
import logger from "./utils/logger.utils";

const server = http.createServer(app);

try {
  await dbConnection(`${VAR.DB_URI}${VAR.DATABASE_NAME}`);
  server.listen(VAR.PORT, () => {
    console.log("\nserver is listening on http://localhost:" + VAR.PORT);
  });

  logger(app);
} catch (e) {
  console.error(e);
}
