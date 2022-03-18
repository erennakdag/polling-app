import axios from "axios";

import { UserData, UserCreate } from './API.models';

// URLS
const API_URL = 'http://127.0.0.1:8000/';
const GET_USER = 'get-user/';
const CREATE_USER = 'create-user/';

// main API fetch function
async function _request<T>(url: string, method: any, data?: T) {
    let response = await axios({
        url: url,
        method: method,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data,
    });
    return await response.data;
}

// API abstraction
export const API = {
    test: async () => _request(API_URL, 'GET'),
    getUser: async (username: string): Promise<UserData> => _request(`${API_URL}${GET_USER}${username}`, 'GET'),
    createUser: async (userCreate: UserCreate): Promise<UserData> => _request<UserCreate>(`${API_URL}${CREATE_USER}`, 'POST', userCreate),
}
