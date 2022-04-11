import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';

export default function registerUser(dataToSubmit) {
    console.log(dataToSubmit);
    const request = axios.post(`/register`, dataToSubmit)
        .then(response => console.log(response.data));
    return {
        type: REGISTER_USER,
        payload: request
    }
}

// `${'/api/users'}/login`
export function loginUser(dataToSubmit) {
    const request = axios.post(`/login`, dataToSubmit)
        .then(response => console.log(response.data));
    return {
        type: LOGIN_USER,
        payload: request
    }
}