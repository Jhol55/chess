

import axios from 'axios';

async function sendRequest(url: string, httpMethod: string, params: object = {}) {
    
    switch(httpMethod) {
        case 'GET':
            return await axios.get(url, params);
        case 'POST':
            return await axios.post(url, params);
        case 'PUT':
            return await axios.put(url, params);
        case 'DELETE':
            return await axios.delete(url, params);
        default:
            throw new Error('Invalid HTTP method');
    }
};


export { sendRequest };