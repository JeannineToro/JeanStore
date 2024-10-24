async function listarProductos() {
    const conexion = await fetch('http://localhost:3000/productos');
    const conexionConvertida = await conexion.json();
    
    return conexionConvertida;
}

export const conexionApi={
    listarProductos
}