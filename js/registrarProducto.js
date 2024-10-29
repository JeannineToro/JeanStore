import { conexionApi } from "./conexionApi.js";

const formulario = document.querySelector("[data-formulario]");
const inputNombre = document.querySelector("[data-nombre]");
const inputPrecio = document.querySelector("[data-precio]");
const inputImagen = document.querySelector("[data-imagen]");
const botonEnviar = document.getElementById("boton-enviar");

// Inicialmente, el botón de enviar está deshabilitado
botonEnviar.disabled = true;

// Función para validar si todos los campos están llenos
function validarFormulario() {
    const nombreValido = inputNombre.value.trim() !== "";
    const precioValido = inputPrecio.value.trim() !== "";
    const imagenValido = inputImagen.value.trim() !== "";

    // Habilitar el botón si todos los campos son válidos
    if (nombreValido && precioValido && imagenValido) {
        botonEnviar.disabled = false;
    } else {
        botonEnviar.disabled = true;
    }
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

async function crearProducto(evento) {
    evento.preventDefault(); // Evitar la recarga de la página

    const nombre = inputNombre.value;
    const precio = inputPrecio.value;
    const imagen = inputImagen.value;

    try {
        // Llamada a la API para registrar el producto
        await conexionApi.registrarProducto(nombre, precio, imagen);

        // Limpiar el formulario después del registro exitoso
        formulario.reset();

        // Deshabilitar el botón de enviar nuevamente
        botonEnviar.disabled = true;

    } catch (error) {
        // Mostrar mensaje de error en caso de que falle
        alert(error);
    }
}

// Agregar el evento submit al formulario
formulario.addEventListener("submit", crearProducto);
