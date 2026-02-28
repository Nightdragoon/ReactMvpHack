//! Este será el archivo para el fetcher


import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

export const fetcTest = async () => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.getAllProductos,
            { params: { solo_activos: false } }
        );
        console.log("Respuesta de fetcTest:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};