import Axios from 'axios';
import labels from '../labels';
import { User } from '../types/index';
import messages from '../../constants/messages';
import { loading } from './loading';
import AuthService from '../../share/authenticate/AuthService';

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

export const authenticate = (payload : {name: string, password: string}, history: any[]) => {
    return async(dispatch : any) => {
        dispatch(loading(true));
        const authService = new AuthService();
        authService.login(payload.name, payload.password)
        .then((resoonse: any)=> {
            if(resoonse.error){
                dispatch(authenticatedError(resoonse.errorMesage))
            }
            else{
                dispatch(authenticated(resoonse.data[0] as User));
                history.push('/');
            }
        })
        .then(()=> dispatch(loading(false)));
    }
};