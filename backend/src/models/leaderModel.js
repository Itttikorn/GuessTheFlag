import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const leaderboard = mongoose.model("leaderboard", leaderSchema, "leaderboard");

export default leaderboard;
