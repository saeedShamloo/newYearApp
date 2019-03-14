import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@material-ui/core";
import messages from "../../../constants/messages";

export type ConfirmDialogProps = {
    open: boolean,
    registeringSurvey: boolean,
    handleClose: ()=> void,
    submitSurvey: ()=> void
}

class ConfirmDialog extends React.Component<ConfirmDialogProps, Readonly<{}>>{
    render(){
        const { open,registeringSurvey, handleClose,submitSurvey } = this.props;
        return(
            <Dialog
                fullScreen={false}
                open={open}
                disableBackdropClick={registeringSurvey}
                disableEscapeKeyDown={registeringSurvey}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{messages.areYouSure}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {registeringSurvey ? <React.Fragment>
                            <Typography variant="h6" component={'span'} color="textSecondary">
                                {messages.wait} ...
                            </Typography>
                            <Typography variant="subtitle1" component={'span'} color="textSecondary">
                                {messages.voteIsRegistering}
                            </Typography>

                        </React.Fragment> : messages.confirmVote }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        !registeringSurvey &&
                        <React.Fragment>
                            <Button  color="primary" onClick={submitSurvey}>
                                {messages.submit}
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                {messages.cancel}
                            </Button>
                        </React.Fragment>
                    }
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmDialog;