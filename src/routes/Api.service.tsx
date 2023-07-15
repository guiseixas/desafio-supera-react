import axios from "axios";
import { TransferenciaFilter } from "../interfaces/TransferenciaFilter";

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
      throw error;
    }
};

export const getTransferenciasFilter = async (transferenciaFilter: TransferenciaFilter) => {
    try {
        const params: { [key: string]: string } = {};
        if (transferenciaFilter.nomeOperadorTransacao !== undefined && transferenciaFilter.nomeOperadorTransacao !== '') {
            params.nomeOperadorTransacao = transferenciaFilter.nomeOperadorTransacao;
        }
        
        if (transferenciaFilter.dataInicio !== undefined && transferenciaFilter.dataInicio !== '') {
            params.dataInicio = transferenciaFilter.dataInicio;
        }

        if (transferenciaFilter.dataFim !== undefined && transferenciaFilter.dataFim !== '') {
            params.dataFim = transferenciaFilter.dataFim;
        }

        const response = await api.get('/api/transferencias', { params });
        return response.data  
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};