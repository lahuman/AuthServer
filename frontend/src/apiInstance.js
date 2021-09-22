import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    headers: {
        "X-token": window.localStorage.getItem('token')
    }
});
instance.interceptors.response.use((res) => res, (error) => {
    if(error.response.status === 403) {
        // window.localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default instance;