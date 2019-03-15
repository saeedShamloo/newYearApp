import labels from '../labels';
import { loading } from './loading';
import AuthService from '../../utils/authenticate/AuthService';
import history from '../../utils/history/history';

export const authenticated = (user: string )=>({
    type: labels.AUTHENTICATED,
    payload: {
        user
    }
});

export const authenticatedError = (errorMessage: string)=>({
    type: labels.AUTHENTICATION_ERROR,
    payload: {
        errorMessage
    }
});

export const authenticate = (payload : {name: string, password: string}) => {
    return async(dispatch : any) => {
        dispatch(loading(true));
        const authService = new AuthService();
        authService.login(payload.name, payload.password)
        .then((resoonse: any)=> {
            if(resoonse.hasError){
                dispatch(authenticatedError(resoonse.message))
            }
            else{
                dispatch(authenticated(resoonse.data.fullName));
                history.push('/');
            }
        })
        .then(()=> dispatch(loading(false)));
    }
};