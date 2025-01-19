import axios from 'axios';
import { BASE_URL } from './config';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export default axiosInstance;
