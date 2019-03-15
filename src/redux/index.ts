import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { IAppState } from './types';
import { authenticate } from './reducers/authenticate';
import { loading } from './reducers/loading';

export const initAppState: IAppState = {
    loading: false,
    authenticate: {
        error: '',
        username: ''
    }
}

const appState = combineReducers({
    loading,
    authenticate
});

const middlewares = applyMiddleware(ReduxThunk);
export const store = createStore(appState,middlewares);