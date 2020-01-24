const mongoose = require("mongoose");

const TriviaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [
            true,
            "Question is required"
        ],
        minlength: [
            15,
            "Question must be at least 15 characters long"
        ]
    },
    correctAnswer: {
        type: String,
        required: [
            true,
            "Correct Answer must be provided"
        ]
    },
    fakeAnswerOne: {
        type: String,
        required: [
            true,
            "Fake Answer 1 must be provided"
        ]
    },
    fakeAnswerTwo: {
        type: String,
        required: [
            true,
            "Fake Answer 2 must be provided"
        ]
    },
}, {timestamps: true});



const Question = mongoose.model("Question", TriviaSchema);

module.exports = Question;

