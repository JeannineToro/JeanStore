//Importaciones
import mostrarMensaje from "./mensajeError.js";

//Enlace de la API
const urlAPI = 'https://6722a06c2108960b9cc50d18.mockapi.io/api/v1/Productos';

//Se obtienen los productos
async function productos() {
    const conexion = await fetch(urlAPI);
    const conexionConvertida = await conexion.json();
    
    return conexionConvertida;
}

//Método POST para registrar productos
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

//Método DELETE para eliminar productos
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

//Búsqueda de productos por nombre a la API
async function buscarProducto(palabraClave) {

    try{
        const conexion = await fetch(urlAPI + `?nombre=${palabraClave}`);

        if (!conexion.ok) {
            throw new Error("No existe el producto");
        }

        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    }catch(error){
        console.error(error);
    }
}

//Se exportan todas las funciones
export const conexionApi={
    productos,
    registrarProducto,
    eliminarProducto,
    buscarProducto
}