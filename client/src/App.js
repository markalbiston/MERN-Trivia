import React, {useState} from 'react';
import './App.css';
import {Router, Link} from '@reach/router';
import Main from './views/Main';
import AddNewQuestion from './views/AddNewQuestion';
import GamePage from './views/GamePage';

function App() {
  const [questions, setQuestions] = useState([]);

  return (
    <div className="App">
        <Link to="/">Home</Link> | <Link to="/new_question">Add a Question</Link>
        <Router>
          <Main questions={questions} setQuestions={setQuestions} path="/" />
          <AddNewQuestion questions={questions} setQuestions={setQuestions} path="/new_question" /> 
          <GamePage path="/playgame"/>
        </Router>
    </div>
  );
}

export default App;
