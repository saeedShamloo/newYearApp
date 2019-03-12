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

export type Player = {
    winner: boolean,
    name: string
}

export type PlayersListItemProps = {
    player: Player,
    classes?: any
}

const PlayersListItem = (props: PlayersListItemProps)=>{
    const {player, classes} = props;
    return (
        <ListItem button>
            <ListItemAvatar>
                { player.winner ?
                    <Avatar className={classes.avatar} src={winnerImage}/> :
                    <Avatar className={classes.avatar}><ImageIcon/></Avatar>}
            </ListItemAvatar>
            <ListItemText primary={player.name} className={classes.playerName}/>
            <ListItemSecondaryAction>
                { player.winner ? <Checkbox checked={true} /> : null}
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default withStyles(playerStyle)(PlayersListItem)