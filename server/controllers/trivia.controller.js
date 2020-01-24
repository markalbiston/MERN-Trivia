const Question = require('../models/trivia.model');

module.exports.createQuestion = (request, response) => {
    const {question, correctAnswer, fakeAnswerOne, fakeAnswerTwo} = request.body;
    Question.create({
        question,
        correctAnswer,
        fakeAnswerOne,
        fakeAnswerTwo
    })
    .then(newQuestion => response.status(200).json({question: newQuestion}))
    .catch(err => response.status(500).json(err));
};

module.exports.findOneQuestion = (request, response) => {
    Question.findOne({_id: request.params.id})
    .then(question => response.json(question))
    .catch(err => response.status(500).json(err));
};

module.exports.findAllQuestions = (request, response) => {
    Question.find({})
    .then(allQuestions => response.json(allQuestions))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.deleteQuestion = (request, response) => {
    Question.deleteOne({_id:request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};



