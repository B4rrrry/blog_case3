import axios from 'axios';

export const $host = axios.create({
  baseURL:process.env.REACT_APP_API_URL
});

export const $authHost = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
  headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}
})

