import * as React from "react";
import { BeatLoader } from 'react-spinners';
import { purple } from "@material-ui/core/colors";
import { Button, TextField, withStyles } from '@material-ui/core';
import messages from '../../constants/messages';

export type LoginFormProps = {
    classes?: any,
    errors: {name: string, password: string},
   touched: any,
   handleChange: (e: any)=> void,
   isValid: boolean,
   setFieldTouched: any,
   values: {name: string, password: string},
   handleSubmit: (value: any)=> void,
   loading: boolean
};
export type LoginFormState = {};

const styles = {
    input: {
        marginBottom: 20,
    },
    submit:{
        margin:'15px 0 0 10px'
    }
}

class LoginForm extends React.Component < LoginFormProps,LoginFormState > {

    change = (name: string, e: any) => {
         const {handleChange, setFieldTouched } = this.props;
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    render() {
        const {
            classes,
            values: { name, password },
            errors,
            touched,
            handleSubmit
          } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <TextField
                    id="نام"
                    name="name"
                    className={classes.input}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    label="نام کاربری"
                    value={name}
                    onChange={this.change.bind(null, "name")}
                    fullWidth
                    />
                     <TextField
                        id="password"
                        name="password"
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        label="رمز عبور" 
                        fullWidth
                        type="password"
                        value={password}
                        onChange={this.change.bind(null, "password")}
                        className={classes.input}
                          />
                <Button type="submit" fullWidth 
                disabled={this.props.loading}
                variant="contained"
                 color="primary"
                 className={classes.submit}>
                  {this.props.loading ? <BeatLoader
                                    sizeUnit={"px"}
                                    size={10}
                                    color={purple[500]}
                                    loading={this.props.loading }/> : `${messages.startGame}`}
                </Button>
            </form>
        );
    }
};

export default withStyles(styles)(LoginForm);