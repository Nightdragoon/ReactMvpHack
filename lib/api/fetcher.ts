//! Este será el archivo para el fetcher


import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

// export const fetcTest = async () => {
//     try {
//         const response = await axios.get(
//             API_ENDPOINTS.getAllProductos,
//             { params: { solo_activos: false } }
//         );
//         console.log("Respuesta de fetcTest:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error al obtener productos:", error);
//         throw error;
//     }
// };

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

export const fetchUpdateProducto = async (id: number, precio: number, nombre: string, activo: number) => {
    try {
        const response = await axios.post(
            API_ENDPOINTS.updateProducto,
            {
                id,
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
}

export const fetchDeleteProducto = async (id: number) => {
    try {
        const response = await axios.delete(
            API_ENDPOINTS.deleteProducto,
            { params: { id } },
        );
        console.log("Respuesta de fetchDeleteProducto:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
}

//enpoints para inventario
export const fetchGetAllInventarios = async () => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.getAllInventario,
        );
        console.log("Respuesta de fetchGetAllInventarios:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener inventarios:", error);
        throw error;
    }
};

export const fetchGetInventario = async (id_producto: number) => {
    let url = API_ENDPOINTS.getInventario
    url = url.replace("{id_producto}", id_producto.toString())
    try {
        const response = await axios.get(
            url
        );
        console.log("Respuesta de fetchGetInventario:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener inventario:", error);
        throw error;
    }
}

export const fetchPostInventario = async (id_producto: number, cantidad: number) => {
    let url = API_ENDPOINTS.crearInventario
    try {
        url = url.replace("{id_producto}", id_producto.toString())
        const response = await axios.post(
            url,
            {
                cantidad
            },
        )
        console.log("Respuesta de fetchPostInventario:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear inventario:", error);
        throw error;
    }
}

export const fetchUpdateInventario = async (id_producto: number, cantidad: number) => {
    let url = API_ENDPOINTS.updateInventario
    try {
        url = url.replace("{id_producto}", id_producto.toString())
        const response = await axios.put(
            url,
            {
                cantidad
            },
        )
        console.log("Respuesta de fetchUpdateInventario:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar inventario:", error);
        throw error;
    }
}

export const fetchDeleteInventario = async (id_producto: number) => {
    let url = API_ENDPOINTS.deleteInventario
    try {
        url = url.replace("{id_producto}", id_producto.toString())
        const response = await axios.delete(
            url
        )
        console.log("Respuesta de fetchDeleteInventario:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar inventario:", error);
        throw error;
    }
}

//endpoints empleados 

export const fetchGetAllEmpleados = async () => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.getAllEmpleados,
        );
        console.log("Respuesta de fetchGetAllEmpleados:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        throw error;
    }
}

export const fetchCrearEmpleados = async (nombre_completo: string, login: string , contrasena: string , Rol: string) => {
    try{
        const response = await axios.post(
            API_ENDPOINTS.crearEmpleados,
            {
                nombre_completo,
                login,
                contrasena,
                Rol
            },
            {headers: {
                'accept': 'application/json',
                    'Content-Type': 'application/json'
             }}
        )
        console.log("Respuesta de fetchCrearEmpleados:", response.data);
        return response.data;
    }catch (error){
        console.error("Error al crear empleado:", error);
        throw error;
    }
}


export const fetchUpdateEmpleados = async (id: number , nombre_completo: string, login: string , contrasena: string , Rol: string) => {
     try{
        const response = await axios.post(
            API_ENDPOINTS.updateEmpleados,
            {
                id,
                nombre_completo,
                login,
                contrasena,
                Rol
            },
            {headers: {
                'accept': 'application/json',
                    'Content-Type': 'application/json'
             }}
        )
        console.log("Respuesta de fetchCrearEmpleados:", response.data);
        return response.data;
    }catch (error){
        console.error("Error al crear empleado:", error);
        throw error;
    }   

}

export const fetchEliminarEmpleados = async (id: number) => {
    try{
        const response = await axios.delete(
            API_ENDPOINTS.eliminarEmpleados,
            {params: {id}}
        )
        console.log("Respuesta de fetchEliminarEmpleados:", response.data);
        return response.data;
    }catch (error){
        console.error("Error al eliminar empleado:", error);
        throw error;
    }
}



// =================================================
// === CAJA
// =================================================

// GET ALL CAJA
export const fetchGetAllCaja = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.getAllCaja);
    console.log("Respuesta de fetchGetAllCaja:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las cajas:", error);
    throw error;
  }
};

// GET CAJA (por id)
export const fetchGetCaja = async (id: number) => {
  try {
    const response = await axios.get(API_ENDPOINTS.getCaja, {
      params: { id },
    });
    console.log("Respuesta de fetchGetCaja:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la caja:", error);
    throw error;
  }
};

// POST CAJA (crear)
export const fetchPostCaja = async (
  idf_producto: number,
  idf_empleado: number,
) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.crearCaja,
      { idf_producto, idf_empleado },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Respuesta de fetchPostCaja:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear caja:", error);
    throw error;
  }
};

// UPDATE CAJA
export const fetchUpdateCaja = async (
  id: number,
  idf_producto: number,
  idf_empleado: number,
 
) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.updateCaja,
      { id, idf_producto, idf_empleado },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Respuesta de fetchUpdateCaja:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar caja:", error);
    throw error;
  }
};

// DELETE CAJA
export const fetchDeleteCaja = async (id: number) => {
  try {
    const response = await axios.delete(API_ENDPOINTS.deleteCaja, {
      params: { id },
    });
    console.log("Respuesta de fetchDeleteCaja:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar caja:", error);
    throw error;
  }
};

// Obtener runway 
export const fetchGetRunway = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.getBaudrate)
        console.log("Respuesta de fetchGetRunway:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener runway:", error);
        throw error;
    }
}
