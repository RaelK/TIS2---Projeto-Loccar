import axios from "axios";

const API = "http://localhost:8080/api/veiculos";

// ✅ Buscar todos os veículos
export const getAllVehicles = async () => {
  const response = await axios.get(API);
  return response.data;
};

// 🔍 Buscar veículo pela placa
export const getVehicleByPlate = async (plate: string) => {
  const response = await axios.get(`${API}/placa/${plate}`);
  return response.data;
};

// 🔍 Buscar veículo por ID
export const getVehicleById = async (id: number) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};