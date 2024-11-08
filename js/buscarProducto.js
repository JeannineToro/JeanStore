import { conexionApi } from "./conexionApi.js";
import crearCard from "./mostrarProductos.js";

const input = document.getElementById("buscar");

async function filtrarProducto(evento) {
    
    evento.preventDefault();

    const lista = document.querySelector("[data-lista]");
    const datosBusqueda = document.querySelector("[data-busqueda]").value;
    const busqueda = await conexionApi.buscarProducto(datosBusqueda);

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    if (!busqueda) {
        lista.innerHTML = `<li class="productos__mensaje">El producto no existe</li>`;
    }else{
        busqueda.forEach(producto=>lista.appendChild(crearCard(producto.id,producto.nombre,producto.precio,producto.imagen)));
    }
    
}

const boton = document.querySelector("[data-botonBusqueda]");
boton.addEventListener("click", evento=>filtrarProducto(evento));
buscar.addEventListener('keyup', function(e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
      filtrarProducto(e);
    }
  });