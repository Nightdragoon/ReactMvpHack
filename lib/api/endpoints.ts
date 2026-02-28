import { get } from "http";

const isBrowser = typeof window !== "undefined";
const API_URL = isBrowser ? "/api-proxy" : process.env.NEXT_PUBLIC_URL_SERVER;

// =================================================
// === Endpoints
// =================================================

export const API_ENDPOINTS = {
    // ejemplo
    docs: `${API_URL}/docs`,
    // !URL_BASE
    base: API_URL,

    // !Products
    getAllProductos: `${API_URL}/GetAllProductos`,
    getProducto: `${API_URL}/GetProducto`,
    guardarProducto: `${API_URL}/PostProducto`,
    updateProducto: `${API_URL}/UpdateProducto`,
    deleteProducto: `${API_URL}/DeleteProducto`,

    // !Inventario
    getAllInventario: `${API_URL}/GetAllInventario`,
    getInventario: `${API_URL}/productos/{id_producto}/inventario`,
    crearInventario: `${API_URL}/productos/{id_producto}/inventario`,
    updateInventario: `${API_URL}/productos/{id_producto}/inventario`,
    deleteInventario: `${API_URL}/productos/{id_producto}/inventario`,
    

    // !Employees

    updateEmpleados: `${API_URL}/UpdateEmpleado`,
    crearEmpleados: `${API_URL}/PostEmpleados`,
    eliminarEmpleados: `${API_URL}/DeleteEmpleado`,
    getAllEmpleados: `${API_URL}/GetAllEmpleados`,

    // !Caja
    getAllCaja: `${API_URL}/GetAllCaja`,
    getCaja: `${API_URL}/GetCaja`,
    crearCaja: `${API_URL}/PostCaja`,
    updateCaja: `${API_URL}/UpdateCaja`,
    deleteCaja: `${API_URL}/DeleteCaja`,

    // !Login
    login: `${API_URL}/Login`,
     //Baudrate
    getBaudrate: `${API_URL}/Obtencion_ganancias_burnrate`,

};

