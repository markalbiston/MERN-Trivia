const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    numberCorrect: {
        type: Number,
    },
    username: {
        type: String,
    },
    questionsAnswered: {
        type: Number,
        min: [3, "Must answer all 3 questions"]
    },

}, {timestamps: true});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;