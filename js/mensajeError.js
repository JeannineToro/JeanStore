export default function mostrarMensaje(mensaje, tipo = "error") {
    const mensajePopup = document.getElementById("mensaje-popup");
    mensajePopup.textContent = mensaje;
    mensajePopup.className = `popup-mensaje ${tipo}`; // Agrega clase según el tipo de mensaje
    mensajePopup.style.display = "block";

    // Oculta el mensaje después de unos segundos
    setTimeout(() => {
        mensajePopup.style.display = "none";
    }, 3000);
}