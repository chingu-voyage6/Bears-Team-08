import * as Express from "express";
import * as bodyParser from "body-parser";
const passport = require('passport');

import * as Config from "./config";

const db = require('./db');
const user = require('./user');

const app = Express();
app.use(bodyParser.urlencoded({ extended: true })); // allow data from a post
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const router = Express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "hello world" });
});

router.use((req, res) => {
  res.send("404: Page not Found");
});

app.use(Config.baseRoute + '/user', user);
app.use(Config.baseRoute, router);

if (Config.isProduction) {
  console.log("is production", Config.staticFiles);
  app.use("/", Express.static(Config.staticFiles));
  app.use("/:drawingId", Express.static(Config.indexFile));
}

// Connect to Mongo on start
// TODO: Move the url to config.ts
db.connect('mongodb://localhost:27017', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        app.listen(Config.port, () => {
            console.log(`Listening on port ${Config.port}`);
        });
    }
});