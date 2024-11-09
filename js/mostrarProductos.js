//Importaciones
import { conexionApi } from "./conexionApi.js";
import mostrarMensaje from "./mensajeError.js";
import { listarProductos } from "./registrarProducto.js";

//Obtenemos los elementos del DOM
const modal = document.getElementById("modal-confirmacion");
const confirmarEliminacionBtn = document.getElementById("confirmar-eliminacion");
const cancelarEliminacionBtn = document.getElementById("cancelar-eliminacion");
const page = document.querySelector("main");

//Función para eliminar productos
async function eliminarProducto(id, producto) {
    modal.style.display = "flex"; // Muestra el modal

    // Espera a que el usuario confirme o cancele
    return new Promise((resolve, reject) => {
        confirmarEliminacionBtn.onclick = async () => {
            try {
                await conexionApi.eliminarProducto(id);
                producto.remove();
                resolve();
            } catch (error) {
                mostrarMensaje("Error al eliminar el producto:" + error);
                reject();
            } finally {
                modal.style.display = "none"; // Oculta el modal
            }
        };

        cancelarEliminacionBtn.onclick = () => {
            modal.style.display = "none"; // Oculta el modal
            reject();
        };
    });
}

//Función que crea la card para cada producto
export default function crearCard(id,nombre,precio,imagen){
    const producto = document.createElement("li"); // Se crea un elemento li

    //Se agrega la clase a cada elemento li
    producto.className = "productos-card";
    //Se agrega el contenido de cada card
    producto.innerHTML = `<img src="${imagen}" alt="Imagen del producto: ${nombre}" class="product-card__image" aria-describedby="productos-card__descripcion">
                    <div class="productos-card__info">
                        <h2 class="productos-card__nombre">${nombre}</h2>
                        <div class="productos-card__bottom">
                            <span class="productos-card__precio">$${precio}</span>
                            <button class="productos-card__trash" aria-label="Eliminar producto" data-id="${id}">
                                <img src="/img/trash.png" alt="icono de cesto de basura">
                            </button>
                        </div>
                    </div>`;

    // Agrega el evento a cada botón de eliminar en las cards
    const botonEliminar = producto.querySelector(".productos-card__trash");
    if (botonEliminar) {
        botonEliminar.addEventListener("click", async () => {
            try {
                await eliminarProducto(id, producto);
                listarProductos();
            } catch (error) {
                console.log("Se canceló la eliminación del producto");
            }
        });
    }

    return producto;
}

//Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = 0; // Inicia la transición de desvanecimiento

  // Después de la transición, oculta completamente el preloader
setTimeout(() => {
    preloader.style.display = "none";
    page.style.visibility = "visible";
  }, 500); // Ajusta el tiempo según la duración de la transición
});