import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Button from '@material-ui/core/Button';
import ResetDialog from './ResetDialog';

const useStyless = () => ({

    card: {
        minWidth: 275,
    },

    title: {
        fontSize: 14,
    },

    pos: {
        marginBottom: 12,
    },

    formControl: {
        margin: 10,
        minWidth: 120,
    },

    textField: {
        marginLeft: 5,
        marginRight: 5,
        width: 200,
    }


});

function GenerateFieldBaseMenuItems(a) {
    let components = [];
    for (let index = 0; index <= 6; index++) {
        if (index == 0) {
            components.push(<MenuItem key={'dice' + a + 'key' + index} value={0}>...</MenuItem>);
        } else if (index < 6) {
            components.push(<MenuItem key={'dice' + a + 'key' + index} value={index * a}>{index * a}</MenuItem>);
        } else {
            components.push(<MenuItem key={'dice' + a + 'key' + index} value={-1}>x</MenuItem>);
        }
    }
    return components;
}

function CardFieldBase(props) {
    return (
        <FormControl variant="filled" style={{ minWidth: '100%' }}>
            <InputLabel >{props.diceValue}'s</InputLabel>
            <Select
                value={props.value}
                onChange={(event) => { props.handleChange(event, props.keyy) }}
            >
                {GenerateFieldBaseMenuItems(props.diceValue)}
            </Select>
        </FormControl>

    );
}

function CardFieldOneOffs(props) {
    return (
        <FormControl variant="filled" style={{ minWidth: '100%' }}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={(event) => { props.handleChange(event, props.keyy) }}
            >
                <MenuItem key={props.keyy + '_' + 0} value={0}>...</MenuItem>
                <MenuItem key={props.keyy + '_' + props.faceValue} value={props.faceValue}>{props.faceValue}</MenuItem>
                <MenuItem key={props.keyy + '_' + -1} value={-1}>x</MenuItem>
            </Select>
        </FormControl>

    );
}

function GenerateFieldOakMenuItems(a) {
    let components = [];
    for (let index = 0; index <= 7; index++) {
        if (index == 0) {
            components.push(<MenuItem key={'dice' + a + 'key' + index} value={0}>...</MenuItem>);
        } else if (index < 7) {
            components.push(<MenuItem key={'dice' + a + 'key' + index} value={index * a}>{index * a}</MenuItem>);
        } else {
            components.push(<MenuItem key={'dice' + a + 'key' + index} value={-1}>x</MenuItem>);
        }
    }
    return components;
}


function CardFieldOaks(props) {
    return (
        <FormControl variant="filled" style={{ minWidth: '100%' }}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={(event) => { props.handleChange(event, props.keyy) }}
            >
                {GenerateFieldOakMenuItems(props.multiple)}

            </Select>
        </FormControl>

    );
}

function GenerateFieldSequenceMenuItems(start, end, step) {
    let components = [];

    components.push(<MenuItem key={'sq_0'} value={0}>...</MenuItem>);

    for (let index = start; index <= end; index += step) {

        components.push(<MenuItem key={'sq' + index} value={index}>{index}</MenuItem>);
    }

    components.push(<MenuItem key={'sq_-1'} value={-1}>x</MenuItem>);

    return components;
}


function CardFieldSequence(props) {
    return (
        <FormControl variant="filled" style={{ minWidth: '100%' }}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={(event) => { props.handleChange(event, props.keyy) }}
            >
                {GenerateFieldSequenceMenuItems(props.start, props.end, props.step)}

            </Select>
        </FormControl>

    );
}



class ScoreCard extends Component {

    constructor(props) {

        super(props);
        this.initialState = {
            playerName: 'player name',

            top1: 0,
            top2: 0,
            top3: 0,
            top4: 0,
            top5: 0,
            top6: 0,

            topScore: 0,
            topBonus: 0,

            pair1: 0,
            pair2: 0,
            oak3: 0,
            oak4: 0,
            flush: 0,
            Flush: 0,
            house: 0,
            chance: 0,
            pasch: 0,

            totScore: 0,
        };
        this.state = this.initialState;

    }

    handleReset = () => {
        this.setState(this.initialState);
    };

    handleTopChange = (event, a) => {
        let newValue = event.target.value;
        this.setState(
            {
                [a]: newValue
            }, () => {
                this.calcTopScore();
            });
    };

    calcTopScore = () => {
        let aNumber = 0;

        for (let index = 0; index < 6; index++) {
            let addValue = this.state['top' + (index + 1)];
            aNumber += addValue == -1 ? 0 : addValue;
        }

        let aBonus = aNumber >= 63 ? 50 : 0;

        this.setState(
            {
                topScore: aNumber,
                topBonus: aBonus
            }, () => {
                this.calcTotScore()
            }
        );

    }

    handleBotChange = (event, a) => {

        let newValue = event.target.value;
        this.setState(
            {
                [a]: newValue
            }, () => {
                this.calcTotScore()
            });
    };

    getTotScore = () => {
        let aNumber = 0;

        aNumber += this.state.topScore;
        aNumber += this.state.topBonus;

        aNumber += this.state.pair1;
        aNumber += this.state.pair2;
        aNumber += this.state.oak3;
        aNumber += this.state.oak4;
        aNumber += this.state.flush;
        aNumber += this.state.Flush;
        aNumber += this.state.house;
        aNumber += this.state.chance;
        aNumber += this.state.pasch;

        return aNumber;
    };

    calcTotScore = () => {

        this.setState(
            {
                totScore: this.getTotScore()
            }
        );
    }


    render() {

        const classses = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <Container style={{ backgroundColor: '#cfe8fc', height: '90vh' }}>

                    <Card className={classses.card}>
                        <CardContent>
                            <TextField
                                id="outlined-helperText"
                                label="Player Name"
                                defaultValue={this.state.playerName}
                                // helperText="Player Name"
                                variant="outlined"
                                style={{ flex: 1 }}
                            />

                            <br /><br />
                            <Grid container spacing={3} >


                                <Grid item xs={6} >
                                    <Paper className={classses.paper} style={{ height: '75vh' }}>
                                        {<CardFieldBase keyy='top1' value={this.state['top1']} handleChange={this.handleTopChange} diceValue={1} />}<br />
                                        {<CardFieldBase keyy='top2' value={this.state['top2']} handleChange={this.handleTopChange} diceValue={2} />}<br />
                                        {<CardFieldBase keyy='top3' value={this.state['top3']} handleChange={this.handleTopChange} diceValue={3} />}<br />
                                        {<CardFieldBase keyy='top4' value={this.state['top4']} handleChange={this.handleTopChange} diceValue={4} />}<br />
                                        {<CardFieldBase keyy='top5' value={this.state['top5']} handleChange={this.handleTopChange} diceValue={5} />}<br />
                                        {<CardFieldBase keyy='top6' value={this.state['top6']} handleChange={this.handleTopChange} diceValue={6} />}<br />

                                        <TextField
                                            id="filled-read-only-input"
                                            label="Bonus"
                                            value={this.state.topBonus}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        /><br />
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Top Total"
                                            value={this.state.topScore}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        /><br />
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Total"
                                            value={this.state.totScore}
                                            margin="normal"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />

                                    </Paper>
                                </Grid>
                                <Grid item xs={6} >
                                    <Paper className={classses.paper} style={{ height: '75vh' }}>
                                        {<CardFieldOaks keyy='pair1' value={this.state['pair1']} handleChange={this.handleBotChange} label='1-Pair' multiple={2} />}<br />
                                        {<CardFieldSequence keyy='pair2' value={this.state['pair2']} handleChange={this.handleBotChange} label='2-Pair' start={6} end={22} step={2} />}<br />
                                        {<CardFieldOaks keyy='oak3' value={this.state['oak3']} handleChange={this.handleBotChange} label='3 oak' multiple={3} />}<br />
                                        {<CardFieldOaks keyy='oak4' value={this.state['oak4']} handleChange={this.handleBotChange} label='4 oak' multiple={4} />}<br />

                                        {<CardFieldOneOffs keyy='flush' value={this.state['flush']} handleChange={this.handleBotChange} label='flush' faceValue={15} />}<br />
                                        {<CardFieldOneOffs keyy='Flush' value={this.state['Flush']} handleChange={this.handleBotChange} label='Flush' faceValue={20} />}<br />
                                        {<CardFieldSequence keyy='house' value={this.state['house']} handleChange={this.handleBotChange} label='House' start={7} end={28} step={1} />}<br />
                                        {<CardFieldSequence keyy='chance' value={this.state['chance']} handleChange={this.handleBotChange} label='Chance' start={5} end={30} step={1} />}<br />
                                        {<CardFieldOneOffs keyy='pasch' value={this.state['pasch']} handleChange={this.handleBotChange} label='Pasch' faceValue={50} />}<br />
                                        <br />
                                        <ResetDialog  resetScoreFunction={this.handleReset}/>
                                    </Paper>

                                </Grid>
                            </Grid>

                        </CardContent>

                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}

export default ScoreCard;