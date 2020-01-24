import React, {useState} from 'react';
import axios from 'axios';
import QuestionForm from '../components/QuestionForm';
import {navigate} from '@reach/router';
import Button from '@material-ui/core/Button';


export default (props) => {
    const {questions, setQuestions} = props;
    const [errors, setErrors] = useState([]);

    const addNewQuestion = (newQuestion1) => {
        axios.post('http://localhost:8000/api/trivia/new', newQuestion1)
        .then(response => {
            setQuestions(response.data)
            if(window.confirm("Question submitted successfully!")){
                navigate('/')
            }
            // window.confirm("Question submitted successfully!")
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }

    return(
        <div>
            <h1>New Question</h1>
            <QuestionForm onSubmitProp={addNewQuestion} />
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <Button variant="contained" color="primary" disableElevation onClick={(e) => navigate("/")}>Cancel</Button>

        </div>
    )
}