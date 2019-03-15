import * as decode from 'jwt-decode';
import {request, urls} from '../../constants/values';
import { ReqWithLoadingAction } from '../fetch/fetch';
import messages from '../../constants/messages';
import history from '../history/history';
const adminUser = {
    firstName: 'admin',
    lastName: 'admin',
    userName: 'admin',
    roles: 'admin'
};

export default class AuthService {
    domain: string;
    constructor(domain?:string) {
        this.domain = domain || (urls.login as string )
    }

    login = async (username:string, password: string)=>{
        let response:any;
         response = await ReqWithLoadingAction(request.post,false,this.domain,{
             username: username,
             password:password
        });

        if(response.data){
            const token = response.data['access_token'];
            const username = response.data['fullName'];
            this.setToken(token);
            this.setUsername(username);
        }else {
            response = { hasError:true, message: messages.loginError }
        }

        return Promise.resolve(response);
    };

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return token && !this.isTokenExpired(token)
    }

    isTokenExpired(token:string) {
        try {
            const decoded: any  = decode(token);
            if (decoded.exp < (Date.now() / 1000)) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken:string) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    setUsername(name: string){
        localStorage.setItem('username', name)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        history.replace('/signin');
    }

    getProfile() {
        // Using jwt-decode to decode the token
        return decode(this.getToken());
    }

    getUsername(){
        return localStorage.getItem('username')
    }

    getRequestHeader(){
            const headers: {[key:string]: string} = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            if (this.loggedIn()) {
                headers['Authorization'] = 'Bearer ' + this.getToken()
            }
            return headers;
    }

    // _checkStatus(response) {
    //     // raises an error in case response status is not a success
    //     if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
    //         return response
    //     } else {
    //         var error = new Error(response.statusText)
    //         error.response = response
    //         throw error
    //     }
    // }
}