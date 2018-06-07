import * as Express from "express";
import * as bodyParser from "body-parser";

import * as Config from "./config";

const app = Express();
app.use(bodyParser.urlencoded({ extended: true })); // allow data from a post
app.use(bodyParser.json());

const router = Express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "hello world" });
});

router.use((req, res) => {
  res.send("404: Page not Found");
});

app.use(Config.baseRoute, router);

if (Config.isProduction) {
  console.log("is production", Config.staticFiles);
  app.use("/", Express.static(Config.staticFiles));
  app.use("/:drawingId", Express.static(Config.indexFile));
}

app.listen(Config.port, () => {
  console.log(`Listening on port ${Config.port}`);
});
