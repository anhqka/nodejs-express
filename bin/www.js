import app from "../app.js";
import http from "http";
import { logger } from "../utils/logger.js";

const port = process.env.PORT || 8080;

app.set("port", port);

var server = http.createServer(app);

server.listen(port, () => {
  if (process.env.PORT) {
    logger.log({
      level: "error",
      message: err,
    });
    return;
  }
  console.log(`app listening on http://localhost:${port}`);
});
