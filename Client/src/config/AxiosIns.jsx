import axios from 'axios';
const BASE_URL="http://localhost:3001/api/v1/";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.timeout=10000000000000;
export default axiosInstance;