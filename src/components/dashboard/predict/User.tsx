import * as React from 'react';
import {
    Avatar,
    Checkbox, Divider,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {indigo} from "@material-ui/core/colors";

export type PredictType = {
    choice: string,
    id: number,
    description: string
}
export type UserProps ={
    predict:PredictType,
    selected: boolean,
    onClick: ()=> void
}

export const User = (props: UserProps)=>{
    const {predict, onClick, selected} = props;
    return (
        <React.Fragment>
            <Divider/>
            <ListItem button onClick={onClick}>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: selected ? indigo[500] : '' }}>{predict.choice.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={predict.choice} secondary={predict.description}/>
                <ListItemSecondaryAction>
                    <Checkbox checked={selected} color={'primary'} onClick={onClick}/>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
};

export default User;