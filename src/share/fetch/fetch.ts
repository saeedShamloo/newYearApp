import Axios from 'axios';
import "@babel/polyfill";
import { store } from '../../redux/index';
import { loading } from '../../redux/actions/loading';

export type requestTypes = 'get' | 'post';
export const baseURL = 'http://localhost:3000';

const isPostRequest = (type: string)=> type == 'psot';
const isGetRequest=(type: string)=> type == 'get';

export const getRequest = async (url:string, params: {[key: string]: string}= {})=>{
        let response = {};
        try{
             response = await Axios.get(url, {
                params: params
            });
        }catch(e){
                response = { hasError: true, error: e }
        }
        return response;
    }

export const postRequest = async(url:string, params: {[key: string]: string} = {}) =>{
        let response = {};
        try{
             response = await Axios.post(url, params)
        }catch(e){
            response = { hasError: true, error: e }
        }
        return response;
}

export const ReqWithLoadingAction = async (type:requestTypes, url:string, params: {[key: string]: string}= {}) =>{
    store.dispatch(loading(true));
    let data= {};
    if(isGetRequest(type)){
        data = await getRequest(url,params);
    }else{
        data= await postRequest(url, params);
    }
    store.dispatch(loading(false));
    return data;
}