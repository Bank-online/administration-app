import axios from 'axios';

//L'URL de l'api
const serverUrl = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:7001/';

export let instance = axios.create({
  baseURL: serverUrl,
  headers: {
    'content-type': 'application/json',
  },
});
