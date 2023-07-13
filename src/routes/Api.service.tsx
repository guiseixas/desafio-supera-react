import axios from "axios";

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTransferencias = async () => {
    try {
      const response = await api.get('/api/transferencias');
      return response.data;
    } catch (error) {
      console.error(error);
    }
};