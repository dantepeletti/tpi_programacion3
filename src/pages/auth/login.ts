import { buscarUsuario } from "../../services/usuarioService.js";

import { guardarDatos } from "../../utils/localStorage.js";

const formulario =
    document.querySelector<HTMLFormElement>("#form-login");

formulario?.addEventListener("submit", (event) => {

    event.preventDefault();

    const formData = new FormData(formulario);

    const email =
        formData.get("email") as string;

    const password =
        formData.get("password") as string;

    const usuario =
        buscarUsuario(email, password);

    if (!usuario) {

        alert("Email o contraseña incorrectos.");

        return;

    }

    guardarDatos("userData", usuario);

    alert(`Bienvenido ${usuario.nombre}`);

    if (usuario.rol === "ADMIN") {

        window.location.href =
            "/src/pages/admin/admin.html";

    } else {

        window.location.href =
            "/index.html";

    }

});