import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8443/api', // 백엔드 주소
  withCredentials: true // 세션 전송 허용
});

export default api;