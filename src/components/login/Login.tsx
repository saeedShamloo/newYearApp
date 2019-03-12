import * as React from 'react';
import LoginForm from './LoginForm';
import {Typography, Paper, withStyles} from '@material-ui/core';
import {Formik} from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { styles } from './loginJSS';
import LoginMessage from './LoginMessage';
import { authenticate } from '../../redux/actions/authenticate';
import { IAppState } from '../../redux/types';

export type LoginClassNames = {
    container: string,
    formWrapper: string,
    loginTitle: string,
    message: string,
    title: string,
};
export type LoginProps = { 
    classes: LoginClassNames,
     handleLogin: (user: {name: string, password: string}, history: any[])=> void,
     error?: string,
     loading: boolean,
     history: any[]
     };

class Login extends React.Component < LoginProps, Readonly<{}> > {

    handleSubmit = (values: {name: string, password: string})=>{
        const { handleLogin,history } = this.props;
        handleLogin(values, history);
    };

    readError = ()=>{
        const {error} = this.props;
        if(error){
            return <Typography variant="subtitle2" gutterBottom align="center" color='error'>{error}</Typography>
        }
        return null
    }
        render() {
            const {classes} = this.props;
            const validationSchema = Yup.object({
                name: Yup.string("")
                .required("وارد کردن نام کاربری اجباری است"),
                password: Yup.string("")
                .min(3, "رمز عبور حداقل 3 کاراکتر می باشد")
                .required("وارد کردن رمز عبور اجباری است"),
            });

            return (
                <Paper className={classes.container} elevation={0}>
                    <Typography variant="h4" gutterBottom align="center" className={classes.title}>
                            به اپلیکیشن کربیکا خوش اومدی.
                    </Typography>
                    <Paper className={classes.formWrapper}>
                       <LoginMessage/>
                        { this.readError() }
                        <Formik 
                            onSubmit={this.handleSubmit}
                            initialValues={{ name:'',password: '' }}
                            validationSchema={validationSchema}
                            render={(props: any) => <LoginForm {...props} loading={this.props.loading}/>}
                        />
                    </Paper>
                </Paper>
            )
    }
}

const LoginComp = withStyles(styles as any)(Login);
const mapStateToProps = (appState: IAppState)=> ({
    error: appState.authenticate.error,
    loading: appState.loading
});

const mapDispatchToProps = (dispatch: any)=>({
    handleLogin: (user: {name: string, password: string}, history: any[])=>  dispatch(authenticate(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComp)