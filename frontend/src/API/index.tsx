import axios from "axios";

// URLS
const API_URL = 'http://127.0.0.1:8000/';
const NEW_POLL = 'new-poll/';
const CREATE_OPTIONS = 'create-options/'
const VOTE = 'vote/';

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
const API = {

    // index page, only returns the varification value for testing the API
    test: async () => _request(API_URL, 'GET'),

    // GET functions
    getPoll: async (poll_id: number) => _request(`${API_URL}${poll_id}`, 'GET'),

    // POST functions
    createPoll: async (pollCreate: any) => _request(`${API_URL}${NEW_POLL}`, 'POST', pollCreate),
    createOptions: async (options: {poll_id: number, texts: string[]}) => _request(`${API_URL}${CREATE_OPTIONS}${options.poll_id}`, 'POST', options.texts),
    vote: async (option_id: number) => _request(`${API_URL}${VOTE}${option_id}`, 'POST'),
}

export default API;
