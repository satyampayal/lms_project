import {axios} from 'axios';

const axiosInstance=axios.create();
const BASE_URL='http://localhost:3001/api/v1';
axiosInstance.default.baseURL=BASE_URL;
axiosInstance.default.timeout=2500;
export default axiosInstance;