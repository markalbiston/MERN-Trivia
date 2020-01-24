const TriviaController = require('../controllers/trivia.controller');

module.exports = app => {
    app.post('/api/trivia/new/', TriviaController.createQuestion);
    app.get('/api/trivia/:id/', TriviaController.findOneQuestion);
    app.get('/api/trivia/', TriviaController.findAllQuestions);
    app.delete('/api/trivia/:id/delete/', TriviaController.deleteQuestion);
}