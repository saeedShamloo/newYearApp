import Axios from 'axios';
import "@babel/polyfill";
import {store} from '../../redux';
import {loading} from '../../redux/actions/loading';
import AuthService from '../authenticate/AuthService';

export type requestTypes = 'get' | 'post';

export const baseURL = 'https://my-json-server.typicode.com/saeedshamloo/newYearAppMock';

const isPostRequest = (type: string) => type == 'psot';
const isGetRequest = (type: string) => type == 'get';
const tokeIsValid = () => {
    const authServices = new AuthService();
    const token = authServices.getToken();
    const isValid = !authServices.isTokenExpired(token);
    if (isValid) {
        return true;
    } else {
        authServices.logout();
        return false;
    }
};

const getAuthorizationHeader = ()=> {
    const authServices = new AuthService();
    return authServices.getRequestHeader();
};

export const getRequest = async (url: string, validateToken:boolean,params: { [key: string]: string } = {}) => {
    if(validateToken && !tokeIsValid()){
        return null;
    }
    let response = {};
    try {
        response = await Axios.get(url, { params: params, headers:  getAuthorizationHeader()});
    } catch (e) {
        response = {hasError: true, error: e}
    }
    return response;
};

export const postRequest = async (url: string,validateToken:boolean, params: { [key: string]: string } = {}) => {
    if(validateToken && !tokeIsValid()){
        return null;
    }
    let response = {};
    try {
        response = await Axios.post(url, params, {headers: getAuthorizationHeader()});
    } catch (e) {
        response = {hasError: true, error: e}
    }
    return response;
};

export const ReqWithLoadingAction = async (type: requestTypes,validateToken:boolean, url: string, params: { [key: string]: string } = {}) => {
    store.dispatch(loading(true));
    let data = {};
    if (isGetRequest(type)) {
        data = await getRequest(url, validateToken,params);
    } else {
        data = await postRequest(url, validateToken,params);
    }
    store.dispatch(loading(false));
    return data;
};