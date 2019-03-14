import * as React from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
    Avatar,
    withStyles
} from "@material-ui/core";
import winnerImage from '../../../../assets/images/tim_80x80.png';
import ImageIcon from '@material-ui/icons/PermIdentity';
import { playerStyle } from './userScoreJSS';
import {Choice} from "../admin/addGame/AddGameChoice";

export type PlayersListItemProps = {
    choice: Choice,
    classes?: any,
    isWinner: boolean
}

const PlayersListItem = (props: PlayersListItemProps)=>{
    const {choice, classes, isWinner} = props;
    return (
        <ListItem className={isWinner ? classes.winnerItem : ''}>
            <ListItemAvatar>
                { isWinner ?
                    <Avatar className={classes.avatar} src={winnerImage}/> :
                    <Avatar className={classes.avatar}><ImageIcon/></Avatar>}
            </ListItemAvatar>
            <ListItemText primary={choice.choice} className={classes.playerName}/>
            <ListItemSecondaryAction>
                { isWinner ? <Checkbox checked={true} color={'primary'}/> : null}
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default withStyles(playerStyle)(PlayersListItem)