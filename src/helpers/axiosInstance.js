import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': `application/json`,
    }
})


// interceptors xử lý các request và response trước và sau gửi và nhận về từ máy chủ. Thay đổi dữ liệu response trả về từ máy chủ trước khi được trả về cho client.
axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;