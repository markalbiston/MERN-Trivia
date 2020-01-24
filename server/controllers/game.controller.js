const Game = require('../models/game.model');


module.exports.createGame = (request, response) => {
    const {numberCorrect, username, questionsAnswered} = request.body;
    Game.create({
        numberCorrect,
        username,
        questionsAnswered
    })
    .then(newGame => response.status(200).json({game: newGame}))
    .catch(err => response.status(500).json(err));
};

module.exports.deleteGame = (request, response) => {
    Game.deleteOne({_id:request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.findAllGames = (request, response) => {
    Game.find({})
    .then(allGames => response.json(allGames))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.updateGame = (request, response) => {
    Game.findOneAndUpdate({_id:request.params.id}, request.body, {runValidators:true, context: 'query'})
    .then(updatedGame => {
        console.log(updatedGame)
        response.json(updatedGame)
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
};