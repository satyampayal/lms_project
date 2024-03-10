import axios from 'axios';

const axiosInstance=axios.create();
const BASE_URL='http://localhost:3001/api/v1';
axiosInstance.baseURL=BASE_URL;
axiosInstance.timeout=2500;
export default axiosInstance;