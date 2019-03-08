import labels from '../labels';
import { Authenticate } from '../types';
import { initAppState } from '../index';

export const authenticate = (state : Authenticate= initAppState.authenticate , payload : any) => {
    switch (payload.type) {
        case labels.AUTHENTICATED:
            return {error: '', authenticated: true, user: payload.user};
        case labels.AUTHENTICATION_ERROR:
            return { ...state, error: payload.errorMessage }
    }
    return state;
}