import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    //talks with backend withCredential always send cookie with every
    //request automatically
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export default api;