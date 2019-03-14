import * as React from 'react';
import {
    Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, List,withStyles
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/StarBorder';
import messages from "../../../constants/messages";
import { cardStyles } from './userScoreJSS';
import PlayersListItem from "./PlayersListItem";

export type ScoreType = {
    gameName: string,
    description: string,
    score: string,
    players: string[],
    winner: boolean
}

export type ScoreCardProp = {
    score: ScoreType,
    classes: any
};

export const ScoreCard = (props: ScoreCardProp)=>{
    const {score, classes} = props;
    return (
        <Grid item xs={12} sm={12} md={4}>
            <Card className={classes.wrapper}>
                <CardHeader
                    title={<Typography variant="h6" color="textPrimary" align={'center'}>{score.gameName}</Typography>}
                    subheader={<Typography variant="subtitle1" color="textPrimary" align={'center'}>{score.description || ''}</Typography>}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={score.score== '10' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                />
                <CardContent style={{ flexGrow:1, padding:8 }}>
                    <div className={classes.cardPricing}>
                        <Typography variant="subtitle1" color="textSecondary">
                            {messages.choices}
                        </Typography>
                    </div>
                    {/*<List dense className={classes.root}>*/}
                        {/*{score.players.map((player: any, index: number) => <PlayersListItem key={index}*/}
                                                                                            {/*player={{name: player, winner: player == score.winner}} />)}*/}
                    {/*</List>*/}
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button fullWidth variant='contained' color="primary">
                        {messages.scoreOfThisGame} : { score.score}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
};

export default withStyles(cardStyles)(ScoreCard);