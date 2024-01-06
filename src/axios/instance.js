import axios from 'axios';
import { const_data } from '../const/const_data';

const instance = axios.create({
    baseURL: const_data.API_URL
})


export default instance;