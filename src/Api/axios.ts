import axios from 'axios';
import { baseURL } from './Api';
import Cookie from 'cookie-universal';

const cookie = Cookie();
const token = cookie.get('Gamzie');

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  },
});
