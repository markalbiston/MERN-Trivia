import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {Router, navigate} from '@reach/router';
import GamePage from './GamePage';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default () => {
    const [games, setGames] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [game, setGame] = useState();


    useEffect(() => {
        axios.get('http://localhost:8000/api/game/')
        .then(response => {
            setGames(response.data);
            setLoaded(true);
        })
    },[])


    const StyledTableCell = withStyles(theme => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles(theme => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
          },
        },
      }))(TableRow);
      const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
      });
      
     
        const classes = useStyles();
    return(
        <div>
            <Button variant="contained" color="primary" disableElevation onClick={(e) => navigate("/playgame")}>Play!</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Score</StyledTableCell>
                        <StyledTableCell align="right">Percentage</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {rows.map(row => ( */}
                    {loaded && games.sort((a,b) => (a.numberCorrect < b.numberCorrect) ? 1 : -1).map((game, index) => 
                        <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                            Username
                        </StyledTableCell>
                        <StyledTableCell align="right">{game.numberCorrect} / 3</StyledTableCell>
                        <StyledTableCell align="right">{(game.numberCorrect/3).toFixed(2)}%</StyledTableCell>
                        </StyledTableRow>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    )
}