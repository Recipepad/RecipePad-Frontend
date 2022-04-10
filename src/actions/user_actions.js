import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function registerUser(dataToSubmit) {
    const request = axios.post(`/register`, dataToSubmit)
        .then(response => response.data);
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