

import axios from 'axios';

async function sendRequest(url: string, httpMethod: string, params: object = {}) {
    
    switch(httpMethod) {
        case 'GET':
            return await axios.get(url);
        case 'POST':
            return await axios.post(url, params);
        case 'PUT':
            return await axios.put(url, params);
        case 'DELETE':
            return await axios.delete(url);
        default:
            throw new Error('Invalid HTTP method');
    }
};


export { sendRequest };