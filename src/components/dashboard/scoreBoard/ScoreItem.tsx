import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Avatar, Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import CommentIcon from '@material-ui/icons/Comment';
import messages from "../../../constants/messages";
import { scoreItemStyles } from './scoreBoardJSS';

export type Player = {
    userFullName: string,
    score: number
}
export type ScoreItemProps = {
    player: Player,
    classes: any
};

const ScoreItem = (props: ScoreItemProps)=>{
    const { player, classes } = props;

    return (
        <React.Fragment>
            <Divider/>
            <ListItem button>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                <ListItemText primary={player.userFullName} secondary={ messages.score + ' : ' + player.score } />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                        <CommentIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
};

export default withStyles(scoreItemStyles)(ScoreItem)