import express from "express";
import http from "http";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}...`)
);

// MongoDB connection
const MONGO_URL =
  "mongodb+srv://m001-student:m001-student@cluster.ufgxbvr.mongodb.net/test";

mongoose.connect(MONGO_URL);
mongoose.connection.once("open", () => console.log("Connected to Database"));
mongoose.connection.on("error", (error: Error) =>
  console.log(`Error: ${error}`)
);

app.use("/", router());
