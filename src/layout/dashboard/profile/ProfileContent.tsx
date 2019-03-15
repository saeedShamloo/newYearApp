import * as React from 'react';
import {Card,Avatar,CardActions,CardContent,Button,Typography,withStyles} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import messages from '../../../constants/messages';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { styles } from './profileJss';

export type ProfileProps = {
    userName: string,
    user: string,
    onLogout: ()=> void,
    classes: any,
}

const ProfileContent = (props : ProfileProps) => {
    const {user,userName, classes, onLogout} = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon/>
                    </Avatar>
                </div>
                <Typography variant="subtitle1"  align='center'>
                    {messages.username} : {user}
                </Typography>
                <Typography color="textSecondary" variant="subtitle2"  align='center'>
                   {messages.fullName} : {userName}
                </Typography>
            </CardContent>
            <CardActions className={classes.actionsWrapper}>
                <Button fullWidth
                        variant="contained"
                        onClick={onLogout} 
                        color="secondary" 
                        size="small" 
                        className={classes.logoutButton}>
                        <ExitToAppIcon className={classes.logOutIcon}/>
                      {messages.exit}
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles as any)(ProfileContent);