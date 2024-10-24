import { conexionApi } from "./conexionApi.js";

const lista = document.querySelector("[data-lista]");

export default function crearCard(nombre,precio,imagen){

    const producto = document.createElement("li");

    producto.className = "productos-card";
    producto.innerHTML = `<img src="${imagen}" alt="Imagen del producto: ${nombre}" class="product-card__image" aria-describedby="productos-card__descripcion">
                    <div class="productos-card__info">
                        <h2 class="productos-card__nombre">${nombre}</h2>
                        <div class="productos-card__bottom">
                            <span class="productos-card__precio">$${precio}</span>
                            <button aria-label="Eliminar producto del carrito" class="productos-card__trash"><img src="/img/trash.png" alt="icono de cesto de basura"></button>
                        </div>
                    </div>`;

    return producto;
}

async function listarProductos() {
    const listaAPI = await conexionApi.listarProductos();
    listaAPI.forEach(producto => lista.appendChild(crearCard(producto.nombre,producto.precio,producto.imagen)));
}

listarProductos();