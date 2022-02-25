import axios from 'axios';

//L'URL de l'api
const serverUrl = 'http://localhost:7001/';

export let instance = axios.create({
  baseURL: serverUrl,
  headers: {
    'content-type': 'application/json',
  },
});
