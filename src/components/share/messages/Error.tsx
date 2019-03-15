import * as React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import { red } from '@material-ui/core/colors';

const styles = ()=>({
   errorStyles : {
       background: red[50],
       border: '1px solid',
       borderColor: red[200],
       padding: 15,
       borderRadius: 4
   }
});

export type ErrorMessageProps = {
    message: string,
    type?: string,
    style?: object,
    classes?: any
};

const ErrorMessage = (props: ErrorMessageProps)=>{
    const { classes,message, type='h6', style } = props;
    return (
        <Typography color={'error'} variant={type} className={classes.errorStyles} style={style}>
            {message}
        </Typography>
    );
};

export default withStyles(styles)(ErrorMessage)