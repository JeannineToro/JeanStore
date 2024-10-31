import { conexionApi } from "./conexionApi.js";
import crearCard from "./mostrarProductos.js";
import mostrarMensaje from "./mensajeError.js";

const formulario = document.querySelector("[data-formulario]");
const inputNombre = document.querySelector("[data-nombre]");
const inputPrecio = document.querySelector("[data-precio]");
const inputImagen = document.querySelector("[data-imagen]");
const botonEnviar = document.getElementById("boton-enviar");
const lista = document.querySelector("[data-lista]");
const seccionProductos = document.querySelector("[data-seccionProductos]");

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


async function listarProductos() {
    try {
        lista.innerHTML = ""; // Limpiamos la lista actual

        // Obtenemos los productos de la API y los mostramos en el DOM
        const listaAPI = await conexionApi.productos();
        if (listaAPI.length === 0) {
            seccionProductos.innerHTML = '<p class="productos__mensaje">Aún no se han agregado productos</p>';
        } else {
            seccionProductos.querySelector(".productos__mensaje")?.remove();
            listaAPI.forEach(producto => {
                lista.appendChild(crearCard(producto.id, producto.nombre, producto.precio, producto.imagen));
            });
        }
    } catch (error) {
        console.error("Error al listar productos:", error);
        seccionProductos.innerHTML = `<p class="productos__mensaje">Error al cargar los productos. Inténtelo más tarde.</p>`;
    }
}

async function crearProducto(evento) {
    evento.preventDefault(); // Evitar la recarga de la página

    const nombre = inputNombre.value;
    const precio = inputPrecio.value;
    const imagen = inputImagen.value;

    try {
        const nuevoProducto = await conexionApi.registrarProducto(nombre, precio, imagen);

        // Agregamos el nuevo producto al DOM sin recargar la lista completa
        lista.appendChild(crearCard(nuevoProducto.id, nombre, precio, imagen));

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


document.addEventListener("DOMContentLoaded", listarProductos);

// Agregar el evento submit al formulario
formulario.addEventListener("submit", crearProducto);
