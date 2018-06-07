import * as Express from "express";
import * as bodyParser from "body-parser";

const app = Express();
app.use(bodyParser.urlencoded({ extended: true })); // allow data from a post
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

const router = Express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "hello world" });
  console.log("hit");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
