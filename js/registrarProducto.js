//Importaciones
import { conexionApi } from "./conexionApi.js";
import crearCard from "./mostrarProductos.js";
import mostrarMensaje from "./mensajeError.js";

//Elementos del HTML
const formulario = document.querySelector("[data-formulario]");
const inputNombre = document.querySelector("[data-nombre]");
const inputPrecio = document.querySelector("[data-precio]");
const inputImagen = document.querySelector("[data-imagen]");
const botonEnviar = document.getElementById("boton-enviar");
const lista = document.querySelector("[data-lista]");
const seccionProductos = document.querySelector("[data-seccionProductos]");
const seccionBuscar = document.querySelector(".productos__buscar");

// Inicialmente, el botón de enviar está deshabilitado
botonEnviar.disabled = true;

// Función para validar si todos los campos están llenos
function validarFormulario() {
    const nombreValido = inputNombre.value.trim() !== "";
    const precioValido = inputPrecio.value.trim() !== "";
    const imagenValido = inputImagen.value.trim() !== "";

    // Habilitar el botón si todos los campos son válidos
    botonEnviar.disabled = !(nombreValido && precioValido && imagenValido);

}

// Escuchar cambios en los campos para verificar si el formulario es válido
inputNombre.addEventListener("input", validarFormulario);
inputPrecio.addEventListener("input", validarFormulario);
inputImagen.addEventListener("input", validarFormulario);

// Validación para permitir solo números, puntos y comas en el campo precio
inputPrecio.addEventListener('input', function(event) {
    let value = event.target.value;

    // Eliminar cualquier carácter que no sea dígito, punto o coma
    value = value.replace(/[^0-9.,]/g, '');

    // Asignar el valor filtrado nuevamente al input
    event.target.value = value;
});


//Función que lista los productos
export async function listarProductos() {
    //Manejando errores
    try {
        lista.innerHTML = ""; // Limpiamos la lista actual

        // Obtenemos los productos de la API y los mostramos en el DOM
        const listaAPI = await conexionApi.productos();
        //Verificamos si la lista está vacía
        if (listaAPI.length === 0) {
            lista.classList.add('vacio'); //Le agregamos la clase "vacio" a la lista
            lista.innerHTML = '<li class="productos__mensaje">Aún no se han agregado productos</li>'; //Si no hay productos se muestra un mensaje
            seccionBuscar.style.display = "none"; //Ocultamos el buscador
        } else {
            //Validamos si la lista tiene la clase "vacio"
            if (lista.classList.contains('vacio')) {
                lista.classList.remove('vacio'); //Eliminamos la clase
            }

            seccionBuscar.style.display = "block"; //Hacemos visible el buscador
            //Pasamos los productos a la función crearCard
            listaAPI.forEach(producto => {
                lista.appendChild(crearCard(producto.id, producto.nombre, producto.precio, producto.imagen));
            });
        }
    } catch (error) {
        //Si hay algún error lo mostramos por consola
        console.error("Error al listar productos:", error);
        //Mostramos el error en la sección de productos
        seccionProductos.innerHTML = `<p class="productos__mensaje">Error al cargar los productos. Inténtelo más tarde.</p>`;
    }
}

//Función que crea el nuevo producto
async function crearProducto(evento) {
    evento.preventDefault(); // Evitar la recarga de la página

    //Recogemos lo ingresado por el usuario
    const nombre = inputNombre.value;
    const precio = inputPrecio.value;
    const imagen = inputImagen.value;

    //Manejo de errores
    try {
        //Creamos el producto
        const nuevoProducto = await conexionApi.registrarProducto(nombre, precio, imagen);

        // Agregamos el nuevo producto al DOM sin recargar la lista completa
        lista.appendChild(crearCard(nuevoProducto.id, nombre, precio, imagen));

        //Listamos los productos
        listarProductos();

        // Limpia los campos del formulario
        evento.target.reset();

        // Deshabilitar el botón de enviar nuevamente
        botonEnviar.disabled = true;

        // Muestra el popup de éxito
        mostrarMensaje("Producto agregado exitosamente", "exito");

    } catch (error) {
        // Mostrar mensaje de error en el popup
        mostrarMensaje("Error al agregar el producto: " + error.message);
    }
}

//Esperar a que se cargue todo el DOM
document.addEventListener("DOMContentLoaded", listarProductos);

// Agregar el evento submit al formulario
formulario.addEventListener("submit", crearProducto);
