import labels from '../labels';
import { ActionType } from '../types';

export const loading = (loading: boolean) : ActionType =>({ type: labels.LOADING, loading })