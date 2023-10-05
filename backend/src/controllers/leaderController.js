import leaderboard from "../models/leaderModel.js";

/** @type {import("express").RequestHandler} */
export const getboard = async (req, res) => {
  const leader = await leaderboard.find().sort({ score: -1 });

  res.status(200).json(leader);
};

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const newItem = new leaderboard(req.body);
    let result = await newItem.save();

    const payload = {
      id: result._id,
    };
    res.status(200).json(payload);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const editItem = async (req, res) => {
  try {
    const updated = await leaderboard.findByIdAndUpdate(req.params.id, req.body);

    if (updated) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
