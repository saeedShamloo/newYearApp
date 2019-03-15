import labels from '../labels';
import { Authenticate } from '../types';
import { initAppState } from '../index';

export const authenticate = (state : Authenticate= initAppState.authenticate , action : any) => {
    switch (action.type) {
        case labels.AUTHENTICATED:
            return {error: '', username: action.payload.user};
        case labels.AUTHENTICATION_ERROR:
            return { ...state, error: action.payload.errorMessage }
    }
    return state;
}