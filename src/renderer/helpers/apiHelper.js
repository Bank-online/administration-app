import axios from 'axios';

//L'URL de l'api
const serverUrl = 'http://api.riale-online.fr:7001/';
export const token = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};
export const instance = axios.create({
  baseURL: serverUrl,
  headers: {
    'content-type': 'application/json',
    apikey: '243716942224322W4myehpg6d66',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
});
