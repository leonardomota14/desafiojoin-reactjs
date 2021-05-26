import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Authorization': 'Basic am9pbnRlY25vbG9naWE6am9pbjEyMw=='
    }
});

export default api;
