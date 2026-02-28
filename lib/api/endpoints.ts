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
    // getProducts: `${API_URL}/api/products`,
    // getProducts: `${API_URL}/api/products`,
    // getProducts: `${API_URL}/api/products`,

    // !Inventory
    //    postInventory: `${API_URL}/api/inventory`,
    //    postInventory: `${API_URL}/api/inventory`,
    //    postInventory: `${API_URL}/api/inventory`,
    //    postInventory: `${API_URL}/api/inventory`,


    // !Employees

    // employees: `${API_URL}/api/employees`,
    // employees: `${API_URL}/api/employees`,
    // employees: `${API_URL}/api/employees`,
    // employees: `${API_URL}/api/employees`,

    // !Cashbox 
};

