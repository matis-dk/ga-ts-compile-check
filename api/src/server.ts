import { User } from "./../../types/User";
import express from "express";
import morgan from "morgan";
import * as ping from "./controllers/ping";

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(morgan(":method :url :status - :response-time ms"));

app.get("/api", ping.getPing);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
