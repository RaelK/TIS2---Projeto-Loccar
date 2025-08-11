import axios from 'axios';

const API = 'http://localhost:8080/api/vistorias';

// 🔍 Buscar todas as vistorias
export const getAllInspections = async () => {
    const response = await axios.get(API);
    return response.data;
};

// 🔍 Buscar uma vistoria por ID
export const getInspectionById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};

// ➕ Criar uma nova vistoria
export const createInspection = async (data: any) => {
    const response = await axios.post(API, data);
    return response.data;
};

// 🔄 Atualizar uma vistoria existente
export const updateInspection = async (id: number, data: any) => {
    const response = await axios.put(`${API}/${id}`, data);
    return response.data;
};

// ❌ Deletar uma vistoria
export const deleteInspection = async (id: number) => {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
};