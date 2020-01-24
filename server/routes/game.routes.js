const GameController = require('../controllers/game.controller');

module.exports = app => {
    app.post('/api/game/new/', GameController.createGame);
    app.get('/api/game/', GameController.findAllGames);
    app.delete('/api/game/:id/delete', GameController.deleteGame);
    app.put('/api/game/:id/edit/', GameController.updateGame);
}