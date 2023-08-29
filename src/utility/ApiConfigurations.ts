import axios from 'axios'

// Create instance called instance
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-type': 'application/json',
    // 'Accept': 'application/json'
  },
});

const parseResponse = (response: any) => {
  return response.data;
}

export const featuredBooksApi = () => api.get('/get_featured_books').then(res => parseResponse(res));
export const signUpApi = (params: any) => api.post('/signUp', params).then(res => parseResponse(res));
export const loginApi = (params: any) => api.post('/auth/login', params).then(res => parseResponse(res));
export const adminLoginApi = (params: any) => api.post('/admin/login', params).then(res => parseResponse(res));
export const admin = {
  booksApi: () => api.get('/admin/books').then(res=>parseResponse(res)),
  booksAddApi: (params:any, onUploadProgress:any) => {
    console.log('params->', params);
    const formData = new FormData();
    formData.append("bookName", params.bookName);
    formData.append("bookAuthor", params.bookAuthor);
    formData.append("bookPrice", params.bookPrice);
    formData.append("bookImage", params.bookImage);
    for (const key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    return api.post('/admin/books/add', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    }).then(res=>parseResponse(res))
  },
  // customers: (params:any) => api.post('/admin/books', params).then(res=>parseResponse(res)),
}