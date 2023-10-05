import express from "express";
import cors from "cors";

import leaderRoute from "./routes/leaderRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/leaderboard", leaderRoute);

export default app;
