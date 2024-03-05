import { rateLimit } from "express-rate-limit";
import express from "express";
import morgan from "morgan";
import compression from "compression";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import roomRouter from "./routes/room.js";
import authenRouter from "./routes/authen.js";
import mongoose from "mongoose";
import { logger } from "./utils/logger.js";

import {
  USERS_ROUTE,
  ROOMS_ROUTE,
  AUTHEN_ROUTE,
  SERVER_ROUTE,
} from "./constants.js";

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 10 * 1000,
  max: 10,
});

const dbUrl =
  "mongodb+srv://unknow14svn:unknow14svn@chat.1ingaw1.mongodb.net/?retryWrites=true&w=majority&appName=chat";

connectToDb().catch((err) =>
  logger.log({
    level: "error",
    message: err,
  })
);

async function connectToDb() {
  await mongoose.connect(dbUrl);
}

app.use(limiter);

app.set('trust proxy', true);

app.use(morgan("combined"));

app.use(express.json());

app.use(compression());

app.use(SERVER_ROUTE.INDEX, indexRouter);

app.use(USERS_ROUTE.INDEX, userRouter);

app.use(ROOMS_ROUTE.INDEX, roomRouter);

app.use(AUTHEN_ROUTE.INDEX, authenRouter);

export default app;
