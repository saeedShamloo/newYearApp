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
                <DialogTitle id="responsive-dialog-title">{"نظرت قطعیه ؟ "}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {registeringSurvey ? <React.Fragment>
                            <Typography variant="h6" component={'span'} color="textSecondary">
                                لطفا منتظر باشید ....
                            </Typography>
                            <Typography variant="subtitle1" component={'span'} color="textSecondary">
                                رای شما در حال ثبت شدن در سیستم می باشد
                            </Typography>

                        </React.Fragment> : ' حواست باشه! رایی که میدی امکان تجدید نظر نداره.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        !registeringSurvey &&
                        <React.Fragment>
                            <Button  color="primary" onClick={submitSurvey}>
                                ثبت کن
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                پشیمون شدم
                            </Button>
                        </React.Fragment>
                    }
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmDialog;