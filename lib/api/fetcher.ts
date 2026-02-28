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

// endpoints para productos
export const fetchGetAllProductos = async (solo_activos: boolean = false) => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.getAllProductos,
            { params: { solo_activos } }
        );
        console.log("Respuesta de fetchGetProuctos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};

export const fetchPostProducto = async (precio: number, nombre: string, activo: number) => {
    try {
        const response = await axios.post(
            API_ENDPOINTS.guardarProducto,
            {
                precio,
                nombre,
                activo
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Respuesta de fetchPostProducto:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
};



