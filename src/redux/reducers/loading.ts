import {ActionType} from '../types';
import lables from '../labels';
import { initAppState } from '../index';

export const loading = (state: boolean = initAppState.loading, payload: ActionType): boolean => {
    switch (payload.type) {
        case lables.LOADING:
            return payload.loading
        default:
            return state
    }
}