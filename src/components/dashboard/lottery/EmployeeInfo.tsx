import * as React from 'react';
import {Checkbox, FormControlLabel, Grid, TextField, Button} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import messages from "../../../constants/messages";

const validateSchema = Yup.object().shape({
    responsibility: Yup.string()
        .required('وارد کردن سمت اجباری است'),
    personnelCode: Yup.string()
        .required('وارد کردن کد پرسنلی اجباری است'),
    unit: Yup.string()
        .required('وارد کردن نام واحد اجباری است'),
});

export type EmployeeInfoProps ={
    onNext: (values: any)=> void,
    onBack: ()=> void,
    initValues: any
}

function EmployeeInfo(props: EmployeeInfoProps) {
    const { onBack,onNext, initValues } = props;

    return (
           <Formik
               validationSchema={validateSchema}
               initialValues={initValues}
               onSubmit={(values: any)=> onNext(values)}
               render={(props)=> <EmployeeInfoForm {...props} onBack={onBack}/>}
           />
    );
}

export default EmployeeInfo;

const EmployeeInfoForm = ({handleSubmit, values, touched,errors,handleChange,setFieldTouched, onBack})=> {

    const onChange = (name: string, e: any) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <EmployeeInfoFields errors={errors} onChange={onChange} touched={touched} values={values} disabledForm={false}/>
                <Grid item xs={12} style={{direction: 'ltr'}}>
                    <Button type="submit" color={'primary'} variant="contained" style={{marginRight:15}}>
                        مرحله بعد
                    </Button>
                    <Button color={'secondary'} variant="contained" onClick={onBack}>{messages.back}</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export const EmployeeInfoFields = ({values, touched,errors,onChange,disabledForm})=>{
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <TextField
                    disabled={disabledForm}
                    id="personnelCode"
                    label={messages.personnelCode}
                    value={values.personnelCode}
                    helperText={touched.personnelCode ? errors.personnelCode : ""}
                    error={touched.personnelCode && Boolean(errors.personnelCode)}
                    onChange={onChange.bind(null, "personnelCode")}
                    fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={disabledForm}
                    id="responsibility"
                    label={messages.responsibility}
                    value={values.responsibility}
                    helperText={touched.responsibility ? errors.responsibility : ""}
                    error={touched.responsibility && Boolean(errors.responsibility)}
                    onChange={onChange.bind(null, "responsibility")}
                    fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField id="unit"
                           disabled={disabledForm}
                           label={messages.unit}
                           value={values.unit}
                           helperText={touched.unit ? errors.unit : ""}
                           error={touched.unit && Boolean(errors.unit)}
                           onChange={onChange.bind(null, "unit")}
                           fullWidth />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary"
                                       name="experimental"
                                       disabled={disabledForm}
                                       checked={values.experimental}
                                       onChange={onChange.bind(null, "unit")}
                    />}
                    label={messages.experimentalPersonnel}
                />
            </Grid>
        </React.Fragment>
    );
};