// filepath: /c:/xampp/htdocs/cse470_project/cse470_frontend/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default api;