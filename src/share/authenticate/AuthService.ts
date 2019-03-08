import * as decode from 'jwt-decode';
import Axios from 'axios';
import messages from '../../constants/messages';

export default class AuthService {
    domain: string;
    constructor(domain?:string) {
        this.domain = domain || 'http://localhost:3000' // API server domain
    }

    login = async (username:string, password: string)=>{
        let response:any;
        try{
             response = await Axios.get(`${this.domain}/users`, {
                params: {
                    username,
                    password
                }
            });
            this.setToken(response.data[0].token);
        }catch(e){
            if(response.status >=200 && response.status <300){
                response = { error:true, errorMesage: messages.loginError }
            }else{
                response = { error:true, errorMesage: messages.serverDown }
            }
        }
        return Promise.resolve(response);
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return Boolean(token); // remove this line in real app
        // return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token:string) {
        try {
            const decoded: any  = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
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

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode to decode the token
        return decode(this.getToken());
    }

    // fetch = (url: string, options: string)=> {
    //     // performs api calls sending the required authentication headers
    //     const headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }

    //     // Setting Authorization header
    //     // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    //     if (this.loggedIn()) {
    //         headers['Authorization'] = 'Bearer ' + this.getToken()
    //     }

    //     return fetch(url, {
    //         headers,
    //         ...options
    //     })
    //         .then(this._checkStatus)
    //         .then(response => response.json())
    // }

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