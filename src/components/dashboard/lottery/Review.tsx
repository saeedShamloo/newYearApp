import React from 'react';
import {
    withStyles,
    Typography,
    Divider,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions
} from '@material-ui/core';
import { reviewStyle } from './lotteryJSS';
import { Formik } from 'formik';
import messages from "../../../constants/messages";
import {EmployeeInfoFields} from "./EmployeeInfo";
import {PersonalInfoFields} from "./PersonalInfo";
import { indigo } from '@material-ui/core/colors';

export type ReviewProps ={
    personal: any,
    employee: any,
    onBack: ()=> void
}

type ReviewState = {
    openDialog : boolean
}
class Review extends React.Component<ReviewProps, ReviewState> {
    constructor(props: ReviewProps){
        super(props);
        this.state = {
            openDialog: false
        }
    }

    handleRegister = ()=>{
      this.setState({
          openDialog: true
      })
    };

    handleClose= ()=>{
        this.setState({
            openDialog: false
        })
    };

    render(){
        const {employee, personal, onBack} = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    {messages.confirmInfo}
                </Typography>
                <Formik
                    render={(props: any) => <ReviewForm {...props} employeeInfo={employee}
                                                        personalInfo={personal}
                                                        onRegister={this.handleRegister}
                                                        onBack={onBack}/>}
                />
                <ErrorDialog open={this.state.openDialog} onClose={this.handleClose}/>
            </React.Fragment>
        );
    }
}


export default withStyles(reviewStyle)(Review);

export const ReviewForm = ({ employeeInfo,personalInfo,onBack, onRegister })=>{
        return(
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <PersonalInfoFields disabledForm={true}
                                        values={personalInfo}
                                        touched={{}}
                                        onChange={() => true}
                                        errors={{}}/>
                </Grid>
                <Grid item xs={12}>
                <Divider variant="fullWidth"
                         style={{marginTop: 25, height: 2, backgroundColor: indigo[300]}}/>

                </Grid>
                <Grid item xs={12}>
                    <EmployeeInfoFields disabledForm={true}
                                        values={employeeInfo}
                                        touched={{}}
                                        onChange={() => true}
                                        errors={{}}/>

                </Grid>
                <Grid item xs={12} style={{direction: 'ltr'}}>
                    <Button type="submit"
                            color={'primary'}
                            onClick={onRegister}
                            variant="contained"
                            style={{marginRight:15}}>
                        {messages.registerFinal}
                    </Button>
                    <Button color={'secondary'} variant="contained" onClick={onBack}>{messages.back}</Button>
                </Grid>
            </Grid>
    );
};

const ErrorDialog = ({open,onClose})=>{
    return(
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{messages.error}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {messages.Boruz}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant={"contained"}>
                    {messages.close}
                </Button>
            </DialogActions>
        </Dialog>
    );
};