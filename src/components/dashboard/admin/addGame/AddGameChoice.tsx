import * as React from 'react';
import {Grid, Chip, TextField, Button, Paper, withStyles, Typography} from '@material-ui/core';

const styles = ()=> ({
    choiceContainer: {
        border:'1px solid #aaa',
        margin:'10px 0',
        padding: 10
    },
    choiceItem: {
        padding: '0 10px',
    },
    choiceBtn: {
        marginTop: 15
    },
    choicesList: {
        padding:5,
        margin:'10px 0'
    }
});

export type Choice = {
    choice: string,
    value: string,
}

export type AddGameChoiceProps = {
    classes: any,
    choices: Choice[],
    onAddGameChoice: (choice:Choice)=> void,
    onDeleteChoice: (choiceKey: string)=> void
}

type AddGameChoiceState = {
    choice: Choice,
}

class AddGameChoice extends React.Component<AddGameChoiceProps, AddGameChoiceState>{

    constructor(props: AddGameChoiceProps){
        super(props);
        this.state = {
            choice: {
                value: '',
                choice: ''
            }
        }
    }

    handleInputChange = (event: Event) =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState:AddGameChoiceState)=> ({
            choice: {
                ...prevState.choice,
                [name]: value
            }
        })
        );
    };

    handleAddChoice = ()=>{
        const { onAddGameChoice } = this.props;
        const { choice } = this.state;
        onAddGameChoice(choice);
        this.setState({
            choice: { choice: '',value: '' }
        })
    };

    render(){
        const { classes, choices, onDeleteChoice } = this.props;
        const { choice } = this.state;
        return(
            <Grid container className={classes.choiceContainer}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        گزینه های بازی
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <TextField
                        id="choice"
                        name="choice"
                        label="عنوان"
                        value={choice.choice}
                        onChange={this.handleInputChange}
                        fullWidth />
                </Grid>
                <Grid item xs={5} sm={5} className={classes.choiceItem}>
                    <TextField
                        id="value"
                        name="value"
                        label="مقدار"
                        value={choice.value}
                        onChange={this.handleInputChange}
                        fullWidth />
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Button variant="contained"
                            color="secondary"
                            className={classes.choiceBtn}
                            onClick={this.handleAddChoice}
                    >اضافه کردن</Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={choices.length ? classes.choicesList: ''}>
                        {choices.map((choice:Choice) => {
                            return (
                                <Chip
                                    key={choice.value}
                                    label={choice.choice}
                                    style={{marginBottom:5}}
                                    onDelete={()=> onDeleteChoice(choice.value)}
                                />
                            );
                        })}
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}
export default withStyles(styles)(AddGameChoice)