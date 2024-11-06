import mostrarMensaje from "./mensajeError.js";
import { listarProductos } from "./registrarProducto.js";

const urlAPI = 'https://6722a06c2108960b9cc50d18.mockapi.io/api/v1/Productos';

async function productos() {
    const conexion = await fetch(urlAPI);
    const conexionConvertida = await conexion.json();
    
    return conexionConvertida;
}


async function registrarProducto(nombre,precio,imagen) {
    try {
        const conexion = await fetch(urlAPI, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ nombre, precio, imagen })
        });
        if (!conexion.ok) throw new Error("Error al registrar el producto");

        mostrarMensaje("Producto registrado con éxito", "exito");
        return await conexion.json();
    } catch (error) {
        mostrarMensaje("Error en el registro del producto: " + error.message);
    }
}


async function eliminarProducto(id) {
    try {
        const conexion = await fetch(urlAPI + `/${id}`, {
            method: 'DELETE'
        });

        if (!conexion.ok) {
            throw new Error("Error al eliminar el producto");
        }

        // Muestra mensaje de éxito
        mostrarMensaje("Producto eliminado con éxito", "exito");
    } catch (error) {
        // Muestra mensaje de error en el popup
        mostrarMensaje("Error en la eliminación del producto: " + error.message);
    }
}

export const conexionApi={
    productos,
    registrarProducto,
    eliminarProducto
}