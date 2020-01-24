import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {navigate} from '@reach/router';



export default (props) => {
    // const {questions} = props;
    const [allQuestions, setAllQuestions] = useState([]);
    const [question, setQuestion] = useState();
    const [questionGroup, setQuestionGroup] = useState([]);
    const [value, setValue] = useState();
    const [loaded, setLoaded] = useState(false);
    const [count, setCount] = useState(1);
    const [currentGame, setCurrentGame] = useState();
    const [numberCorrect, setNumberCorrect] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/trivia/')
        .then(response => {
            setAllQuestions(response.data);
            setLoaded(true);
        });
    },[])

    const handleChange = event => {
        event.preventDefault();
        setValue(event.target.value);
        if(value === "correct"){
            setNumberCorrect(numberCorrect+1)
        }
        if(count<3){
            setCount(count+1);
        }
        setQuestionsAnswered(count);
        console.log(count);
        event.disabled = true;
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("IM TRYING TO SUBMIT")
        console.log('questionsAnswered:' +questionsAnswered)
        console.log('numberCorrect:' +numberCorrect)
        const newGame = {
            numberCorrect: numberCorrect,
            questionsAnswered: questionsAnswered};
        axios.post('http://localhost:8000/api/game/new', newGame)
        .then(response => {
            setCurrentGame(response.data);
            // if(window.confirm(`You answered ${numberCorrect} questions correctly`)){
            //     navigate('/')
            // }
            navigate("/");
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
      }

    if(loaded && questionGroup.length<3){
        // console.log(allQuestions);
        const randID = Math.floor(Math.random() * allQuestions.length);
        // console.log(randID1)
        const firstQuestion = allQuestions.splice(randID,1);
        // console.log(firstQuestion);
        setQuestionGroup([...questionGroup, firstQuestion[0]]);
        console.log(questionGroup)

    }

    const useStyles = makeStyles({
        card: {
          minWidth: 400,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 24,
          display: 'inline-block'
        },
        pos: {
          marginBottom: 12,
        },
    });
    const classes = useStyles();
    return(
        <form onSubmit={onSubmit}>
        <FormControl className={classes.FormControl} >
            {questionGroup.map((question, index) => 
            <Card key={index} className={classes.card} variant="outlined">
                <CardContent>
                    <Typography>
                        {question.question}
                        <RadioGroup value={value} id={question.question} onChange={handleChange}>
                            <FormControlLabel value={"correct"} control={<Radio />} label={question.correctAnswer}/>
                            <FormControlLabel value={"incorrect"} control={<Radio />} label={question.fakeAnswerOne} />
                            <FormControlLabel value={"alsoincorrect"} control={<Radio />} label={question.fakeAnswerTwo} />
                        </RadioGroup>
                    </Typography>
                </CardContent>
            </Card>
            )}
            <Button variant="contained" color="primary" disableElevation type="submit" >Submit Answers</Button>

            {errors.map((err, index) => <p className="error" key={index}>{err}</p>)}
        </FormControl>
</form>

    )
}