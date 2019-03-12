import * as React from 'react';
import {TextField, Grid, Button} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import messages from "../../../constants/messages";

const validateSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'حداقل ۳ کاراکتر!')
        .max(20, 'حداکثر ۲۰ کاراکتر')
        .required('وارد کردن نام اجباری است'),
    lastName: Yup.string()
        .min(3, 'حداقل ۳ کاراکتر!')
        .max(20, 'حداکثر ۲۰ کاراکتر')
        .required('وارد کردن نام خانوادگی اجباری است'),
    nationalCode: Yup.string()
        .matches(/^\d{10}$/,'طول کد ملی ۱۰ رقم می باشد')
        .required('وارد کردن کد ملی اجباری است'),
    mobile: Yup.string()
        .matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,'فرمت شماره وارد شده اشتباه است')
        .required('وارد کردن شماره موبایل اجباری است'),
    email: Yup.string()
        .email('فرمت ایمیل اشتباه است')
        .required('وارد کردن ایمیل اجباری است'),
    address: Yup.string()
        .min(15, 'حداقل طول آدرس ۱۵ کاراکتر می باشد')
        .required('وارد کردن آدرس اجباری است'),
    postalCode: Yup.string()
        .matches(/\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/, 'کد پستی وارد شده اشتباه است - فقط عدد وارد شود')
        .required('وارد کردن کد پستی اجباری است'),
});

export type PersonalInfoProps= {
    onNext: (values: any)=> void,
    initValues: any
}

function PersonalInfo(props: PersonalInfoProps) {
    const { onNext, initValues } = props;

    return (
        <React.Fragment>
            <Formik
                validationSchema={validateSchema}
                initialValues={initValues}
                onSubmit={(values: any)=> onNext(values)}
                render={(props)=> <PersonalInfoForm {...props}/>}>
            </Formik>
        </React.Fragment>
    );
}

export default PersonalInfo;

export const PersonalInfoForm = ({handleSubmit,values,touched,errors,handleChange,setFieldTouched})=>{

    const onChange = (name: string, e: any) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PersonalInfoFields values={values} touched={touched} onChange={onChange} errors={errors} disabledForm={false}/>
            <Grid item xs={12} style={{direction: 'ltr',marginTop:15}}>
                <Button type="submit" color={'primary'} variant="contained" >
                    {messages.next}
                </Button>
            </Grid>
        </form>
    );
};
export const PersonalInfoFields = ({values,touched,onChange,errors,disabledForm})=>{
    return (
        <React.Fragment>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="firstName"
                        name="firstName"
                        fullWidth
                        label={messages.firstName}
                        value={values.firstName}
                        helperText={touched.firstName ? errors.firstName : ""}
                        error={touched.firstName && Boolean(errors.firstName)}
                        onChange={onChange.bind(null, "firstName")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="lastName"
                        name="lastName"
                        label={messages.lastName}
                        value={values.lastName}
                        fullWidth
                        helperText={touched.lastName ? errors.lastName : ""}
                        error={touched.lastName && Boolean(errors.lastName)}
                        onChange={onChange.bind(null, "lastName")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="nationalCode"
                        name="nationalCode"
                        label={messages.nationalCode}
                        fullWidth
                        value={values.nationalCode}
                        helperText={touched.nationalCode ? errors.nationalCode : ""}
                        error={touched.nationalCode && Boolean(errors.nationalCode)}
                        onChange={onChange.bind(null, "nationalCode")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="mobile"
                        name="mobile"
                        label={messages.mobile}
                        value={values.mobile}
                        fullWidth
                        helperText={touched.mobile ? errors.mobile : ""}
                        error={touched.mobile && Boolean(errors.mobile)}
                        onChange={onChange.bind(null, "mobile")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="email"
                        name="email"
                        value={values.email}
                        label={messages.email}
                        fullWidth
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        onChange={onChange.bind(null, "email")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="address"
                        name="address"
                        value={values.address}
                        label={messages.address}
                        fullWidth
                        helperText={touched.address ? errors.address : ""}
                        error={touched.address && Boolean(errors.address)}
                        onChange={onChange.bind(null, "address")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disabledForm}
                        id="postalCode"
                        name="postalCode"
                        value={values.postalCode}
                        label={messages.postalCode}
                        fullWidth
                        helperText={touched.postalCode ? errors.postalCode : ""}
                        error={touched.postalCode && Boolean(errors.postalCode)}
                        onChange={onChange.bind(null, "postalCode")}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};