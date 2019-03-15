import * as React from 'react';
import {
    Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, List, withStyles
} from '@material-ui/core';
import messages from "../../../constants/messages";
import {cardStyles} from './userScoreJSS';
import PlayersListItem from "./PlayersListItem";
import {Choice} from "../admin/addGame/AddGameChoice";

export type ScoreType = {
    gameName: string,
    description: string,
    score: string,
    players: string[],
    winner: boolean,
    gameDefinition: any
}

export type ScoreCardProp = {
    score: ScoreType,
    classes: any
};

export const ScoreCard = (props: ScoreCardProp) => {
    const {score, classes} = props;
    return (
        <Grid item xs={12} sm={12} md={4}>
            <Card className={classes.wrapper}>
                <CardHeader
                    title={<Typography variant="h6" color="textPrimary"
                                       align={'center'}>{score.gameDefinition.name}</Typography>}
                    subheader={<Typography variant="subtitle2" color="textPrimary"
                                           align={'center'}>{score.gameDefinition.description}</Typography>}
                    titleTypographyProps={{align: 'center'}}
                    subheaderTypographyProps={{align: 'center'}}
                    className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                    <div className={classes.cardPricing}>
                        <Typography variant="subtitle1" color="textSecondary">
                            {messages.choices}
                        </Typography>
                    </div>
                    <List dense className={classes.root}>
                        {getChoices(score.gameDefinition.choices, score.gameDefinition)}
                    </List>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button fullWidth variant='contained' color="primary">
                        {messages.scoreOfThisGame} : {score.score}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
};

export default withStyles(cardStyles as any)(ScoreCard);

function getChoices(choices: any[],gameDefinition: any) : React.ReactElement[] | null{
    let choicesList = null;
    if(Array.isArray(choices)){
        choicesList = choices.map((choice: Choice, index: number) =>
        <PlayersListItem key={index}
                         isWinner={gameDefinition.answer == choice.value}
                         choice={choice}/>);
    }
    return choicesList;
}