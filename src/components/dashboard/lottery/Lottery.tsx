import * as React from 'react';
import {withStyles,CssBaseline,AppBar,Toolbar,Paper,Stepper,Step,StepLabel,Button,Typography} from '@material-ui/core';
import PersonalInfo from './PersonalInfo';
import EmployeeInfo from './EmployeeInfo';
import Review from './Review';
import { styles } from './lotteryJSS';
import messages from "../../../constants/messages";

const steps = ['اطلاعات شخصی', 'اطلاعات شغلی', 'تایید نهایی'];
const personInit = {
    firstName:'',
    lastName: '',
    nationalCode: '',
    mobile: '',
    email: '',
    address: '',
    postalCode:''
};

const employeeInit= {
    responsibility: '',
    personnelCode: '',
    unit: ''
};

export type LotteryProps = {};
type LotteryState = {
    activeStep: number,
    personalInfo: any,
    employeeInfo: any
}
class Lottery extends React.Component<LotteryProps, LotteryState> {
    constructor(props: LotteryProps){
        super(props);
        this.state = {
            activeStep: 0,
            personalInfo: personInit,
            employeeInfo: employeeInit
        };
    }

    getStepContent = (step)=> {
        switch (step) {
            case 0:
                return <PersonalInfo onNext={this.handleNext.bind(this,'personalInfo')} initValues={this.state.personalInfo}/>;
            case 1:
                return <EmployeeInfo initValues={this.state.employeeInfo} onNext={this.handleNext.bind(this,'employeeInfo')} onBack={this.handleBack}/>;
            case 2:
                return <Review employee={this.state.employeeInfo} personal={this.state.personalInfo} onBack={this.handleBack} />;
            default:
                throw new Error('Unknown step');
        }
    };

    handleNext = (name: string, value: any) => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
            [name]: value
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            {messages.lotteryTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Paper className={classes.paper}>
                        <Typography component="h3" variant="h5" align="center">
                            {messages.completeInfo}
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {this.getStepContent(activeStep)}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Lottery);