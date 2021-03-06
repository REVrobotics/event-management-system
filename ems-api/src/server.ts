import express from "express";
import http from "http";
import parser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import * as path from "path";
import * as Errors from "./errors";
import logger from './logger';
import * as ErrorHandler from "./error-handler";
import * as Validator from "./validator";
import * as dotenv from "dotenv";
import {EventController} from "./controllers/Event";
import {TeamController} from "./controllers/Team";
import {ScheduleController} from "./controllers/Schedule";
import {MatchController} from "./controllers/Match";
import {RankingController} from "./controllers/Ranking";
import {AllianceController} from "./controllers/Alliance";

/* Load our environment variables. The .env file is not included in the repository.
 * Only TOA staff/collaborators will have access to their own, specialized version of
 * the .env file.
 */
dotenv.config({path: path.join(__dirname, "../.env")});

const ipRegex = /\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/;

const app: express.Application = express();
const mode = (process.env.NODE_ENV || "development").toUpperCase();
const port = process.env.PORT || 8008;
let host = process.env.HOST || "127.0.0.1";

if (process.argv[2] && process.argv[2].match(ipRegex)) {
  host = process.argv[2];
}

app.use(cors());
app.use(helmet());

app.use(parser.json({limit: "5mb"}));
app.use(parser.urlencoded({ limit: "5mb", extended: false }));

/* This API will only be sending out json data, so if the request takes something else, it's not safe. */
app.use((req, res, next) => {
  if (req.get("Content-Type") !== "application/json") {
    next(Errors.UNACCEPTABLE_CONTENT_TYPE);
  } else if (!req.accepts("application/json")) {
    next(Errors.UNACCEPTABLE_CONTENT_TYPE);
  } else {
    next();
  }
});

/* Defining a simple test route. */
app.use("/ping", (req, res) => {
    res.send({res: "pong!"});
});

app.use("/api/*", Validator.validate);

app.use("/api/event", EventController);
app.use("/api/team", TeamController);
app.use("/api/schedule", ScheduleController);
app.use("/api/match", MatchController);
app.use("/api/ranking", RankingController);
app.use("/api/alliance", AllianceController);

/* If the user is trying to get to a route not previously handled, it wasn't found. */
app.all("*", (req, res, next) => {
  next(Errors.CONTENT_NOT_FOUND);
});

app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.handleClient);

http.createServer(app).listen({
  port: port,
  host: host
}, () => logger.info(`EMS API running on ${host}:${port} in ${mode} mode.`));