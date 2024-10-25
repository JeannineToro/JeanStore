async function productos() {
    const conexion = await fetch('http://localhost:3000/productos');
    const conexionConvertida = await conexion.json();
    
    return conexionConvertida;
}


async function registrarProducto(nombre,precio,imagen) {
    const conexion = await fetch('http://localhost:3000/productos',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            nombre: nombre,
            precio: precio,
            imagen: imagen
        })
    });

    const conexionConvertida = await conexion.json();

    return conexionConvertida;
}

export const conexionApi={
    productos,
    registrarProducto
}