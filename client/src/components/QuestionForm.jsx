import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: 40,
  },
}));

export default (props) => {
    const {onSubmitProp} = props;
    const [question, setQuestion] = useState();
    const [correctAnswer, setCorrectAnswer] = useState();
    const [fakeAnswerOne, setFakeAnswerOne] = useState();
    const [fakeAnswerTwo, setFakeAnswerTwo] = useState();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({question, correctAnswer, fakeAnswerOne, fakeAnswerTwo});
        document.getElementById("questioninput").value="";
        document.getElementById("correctanswerinput").value="";
        document.getElementById("fakeanswer1input").value="";
        document.getElementById("fakeanswer2input").value="";
    }

    return(
        <form onSubmit={onSubmitHandler}>
            {/* <label>Question</label> */}
            <TextField
            id="questioninput"
            label="Question"
            style={{ margin: 12, height: 40,  }}
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            onChange={(e) => setQuestion(e.target.value)}
            />

            <TextField
            id="correctanswerinput"
            label="Correct Answer"
            style={{ margin: 12, height: 40,  }}
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            onChange={(e) => setCorrectAnswer(e.target.value)}
            />

            <TextField
            id="fakeanswer1input"
            label="Fake Answer 1"
            style={{ margin: 12, height: 40,  }}
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            onChange={(e) => setFakeAnswerOne(e.target.value)}
            />

            <TextField
            id="fakeanswer2input"
            label="Fake Answer 2"
            style={{ margin: 12}}
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            onChange={(e) => setFakeAnswerTwo(e.target.value)}
            />
            <Button variant="contained" color="primary" disableElevation type="submit">Submit Question</Button>
        </form>
    )
}