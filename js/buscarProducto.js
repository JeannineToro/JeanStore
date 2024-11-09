//Importaciones
import { conexionApi } from "./conexionApi.js";
import crearCard from "./mostrarProductos.js";

//El input del buscador
const buscar = document.getElementById("buscar");

//Función filtrar la lista de productos
async function filtrarProducto(evento) {
    
    evento.preventDefault(); //Evita la recarga de la página

    //Obtenemos los elementos HTML
    const lista = document.querySelector("[data-lista]");
    const datosBusqueda = document.querySelector("[data-busqueda]").value;
    
    //Manejando errores
    try {
        //Obtenemos el resultado de la búsqueda
        const busqueda = await conexionApi.buscarProducto(datosBusqueda);

        //Recorremos la lista
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild); //Se elimina el primer hijo de la lista
        }

        //Si no resulta nada de la búsqueda se muestra un mensaje
        if (!busqueda) {
            lista.innerHTML = `<li class="productos__mensaje">El producto no existe</li>`;
        }else{
        //Si encuentra algo se crea la card
        busqueda.forEach(producto=>lista.appendChild(crearCard(producto.id,producto.nombre,producto.precio,producto.imagen)));
        }
    } catch (error) {
        console.error("Error al buscar el producto:", error);
        lista.innerHTML = '<li class="productos__mensaje">Ocurrió un error al buscar el producto. Inténtalo de nuevo más tarde</li>';
    }
}

//Obtenemos el botón de búsqueda y agregamos el evento
const boton = document.querySelector("[data-botonBusqueda]");
boton.addEventListener("click", evento=>filtrarProducto(evento));
//Agregamos el evento al input del buscador para que detecte cuando se hace enter
buscar.addEventListener('keyup', function(e) {
    if (e.code === "Enter" ) {
        filtrarProducto(e);
    }
});