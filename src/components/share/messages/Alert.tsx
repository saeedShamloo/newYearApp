import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import messages from "../../../constants/messages";
export type AlertProps = {
    message: string,
    onClose: ()=> void,
    open: boolean
}

const Alert = (props: AlertProps)=>{
    const {message,open, onClose} = props;
    return(
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                Modal title
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {messages.close}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Alert;