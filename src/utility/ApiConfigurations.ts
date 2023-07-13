import axios from 'axios'

// Create instance called instance
const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
    },
});

const parseResponse = (response:any) => {
    return response.data;
} 

export const featuredBooksApi = () => api.get('/get_featured_books').then(res=>parseResponse(res));
export const signUpApi = (params:any) => api.post('/signUp', params).then(res=>parseResponse(res));
export const loginApi = (params:any) => api.post('/auth/login', params).then(res=>parseResponse(res));