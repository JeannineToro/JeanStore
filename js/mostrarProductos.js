import { conexionApi } from "./conexionApi.js";

const lista = document.querySelector("[data-lista]");
const modal = document.getElementById("modal-confirmacion");
const confirmarEliminacionBtn = document.getElementById("confirmar-eliminacion");
const cancelarEliminacionBtn = document.getElementById("cancelar-eliminacion");


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
                console.error("Error al eliminar el producto:", error);
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

export default function crearCard(id,nombre,precio,imagen){
    const producto = document.createElement("li");

    producto.className = "productos-card";
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
            await eliminarProducto(id, producto);
        });
}


    return producto;
}


async function listarProductos() {
    const listaAPI = await conexionApi.productos();
    lista.innerHTML = '';
    listaAPI.forEach(producto => lista.appendChild(crearCard(producto.id,producto.nombre,producto.precio,producto.imagen)));
}

document.addEventListener("DOMContentLoaded", listarProductos);