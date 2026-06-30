import type { IUser } from "../../types/IUser.js";
import { registrarUsuario, existeMail } from "../../services/usuarioService.js";

const formulario =
    document.querySelector<HTMLFormElement>("#form-registro");

formulario?.addEventListener("submit", (event) => {

    event.preventDefault();

    const datos = new FormData(formulario);

    const mail =
        datos.get("email") as string;

    if (existeMail(mail)) {

        alert("Ese email ya está registrado.");

        return;

    }

    const usuario: IUser = {

        id: Date.now(),
        nombre: datos.get("nombre") as string,
        apellido: datos.get("apellido") as string,
        celular: datos.get("celular") as string,
        mail,
        password: datos.get("password") as string,
        rol: "USUARIO"

    };

    registrarUsuario(usuario);

    alert("Usuario registrado correctamente.");

    window.location.href = "./login.html";

});