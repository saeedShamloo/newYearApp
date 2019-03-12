import labels from '../labels';
import { User } from '../types/index';
import { loading } from './loading';
import AuthService from '../../utils/authenticate/AuthService';
import history from '../../utils/history/history';

export const authenticated = (user: User )=>({
    type: labels.AUTHENTICATED,
    payload: {
        user
    }
});

export const authenticatedError = (errorMessage: string)=>({
    type: labels.AUTHENTICATION_ERROR,
    errorMessage
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
                dispatch(authenticated(resoonse.data[0] as User));
                history.push('/');
            }
        })
        .then(()=> dispatch(loading(false)));
    }
};