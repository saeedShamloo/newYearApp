import * as React from 'react';
import {
    Avatar,
    Checkbox,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    withStyles
} from "@material-ui/core";
import {Choice} from "../admin/addGame/AddGameChoice";
import { playerNameStyle } from './gameJSS';

export type ChoiceItemProps = {
    choice: Choice,
    onClick: (value: string)=> (()=> void),
    classes:any,
    selected: boolean
}

const ChoiceItem = (props:ChoiceItemProps)=>{
    const {choice, onClick, classes, selected=false} = props;
    return (
        <React.Fragment>
            <ListItem button onClick={onClick(choice.value)}>
                <ListItemAvatar>
                    <Avatar className={ selected ? classes.activeAvatar :classes.avatar}>{choice.choice.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={choice.choice} className={classes.playerName}/>
                <ListItemSecondaryAction>
                    <Checkbox checked={selected} color={'primary'} onClick={onClick(choice.value)}/>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
};

export default withStyles(playerNameStyle)(ChoiceItem);