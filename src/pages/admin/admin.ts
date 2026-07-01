import { obtenerDatos } from "../../utils/localStorage.js";
import type { IUser } from "../../types/IUser.js";
import { getPedidos } from "../../services/pedidoService.js";
import { renderPedidosAdmin } from "../../components/pedidoAdminComponent.js";

const usuario =
    obtenerDatos<IUser>("userData");

if (!usuario) {

    alert("Debe iniciar sesión.");

    window.location.href =
        "/src/pages/auth/login.html";

}

if (usuario?.rol !== "ADMIN") {

    alert("No tiene permisos para acceder.");

    window.location.href =
        "/index.html";
}

async function iniciar(): Promise<void> {

    const pedidos =
        await getPedidos();

    renderPedidosAdmin(pedidos);

}

iniciar();