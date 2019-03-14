import * as React from 'react';
import {
    Avatar,
    Checkbox, Divider,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";

export type User = {
    firstName: string,
    lastName: string,
    userName: string,
}
export type UserProps ={
    user:User,
    selected: boolean,
    onClick
}

export const User = (props: UserProps)=>{
    const {user, onClick, selected} = props;
    return (
        <React.Fragment>
            <ListItem button onClick={onClick}>
                <ListItemAvatar>
                    <Avatar>{user.firstName.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${user.firstName} ${user.lastName}`}/>
                <ListItemSecondaryAction>
                    <Checkbox checked={selected} color={'primary'}/>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
        </React.Fragment>
    );
};

export default User;