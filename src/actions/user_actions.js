import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    FETCH_PROFILE,
    UPDATE_PROFILE
} from './types';

export default function registerUser(dataToSubmit) {
    const request = axios.post(`/register`, dataToSubmit)
        .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

// To-do: not idea how to fetch status code
export function loginUser(dataToSubmit) {
    const request = axios.post(`/login`, dataToSubmit)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`/auth`)
        .then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`/logout`)
        .then(response => response.data);
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function fetchProfile() {
    console.log(`/profile/${window.localStorage.userId}`)
    const request = axios.get(`/profile/${window.localStorage.userId}`)
        .then(response => response.data);
    return {
        type: FETCH_PROFILE,
        payload: request
    }
}

export function updateProfile(dataToSubmit) {
    const request = axios.post(`/profile`, dataToSubmit)
    .then(response => response.data);
    return {
    type: UPDATE_PROFILE,
    payload: request
    }
}