import * as React from 'react';
import {Paper, Typography, withStyles} from '@material-ui/core';
import {messageStyles} from './loginJSS';
export type LoginMessagesProsp = {
    classes : {
        wrapper: string,
        message: string
    }
}

class LoginMessage extends React.Component<LoginMessagesProsp,Readonly<{}>>{
    render(){
        const { classes } = this.props;
        return(
            <Paper elevation={1} className={classes.wrapper}>
            <Typography variant="subheading" align="center" className={classes.message}>
               نام کاربری و رمز عبور خودتو از مدیر سیستم می تونی بگیری
            </Typography>
        </Paper>
        );
    }
 
};

export default withStyles(messageStyles as any)(LoginMessage);