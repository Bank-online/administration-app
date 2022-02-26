import axios from 'axios';

//L'URL de l'api
const serverUrl = 'http://localhost:7001/';
export const token = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};
export const instance = axios.create({
  baseURL: serverUrl,
  headers: {
    'content-type': 'application/json',
  },
});
