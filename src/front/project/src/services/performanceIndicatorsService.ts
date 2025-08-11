import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // local
// const API_BASE_URL = 'https://seu-app.onrender.com'; // produção

export const getPerformanceIndicators = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/performance-indicators`);
  return response.data;
};
