import { obtenerPedidos } from "../../services/pedidoService.js";
import { obtenerDatos } from "../../utils/localStorage.js";

import type { IUser } from "../../types/IUser.js";

const contenedor =
    document.querySelector<HTMLDivElement>("#listaPedidos");

const usuario =
    obtenerDatos<IUser>("userData");

if (!contenedor || !usuario) {

    throw new Error("Usuario no autenticado.");

}

const pedidos = obtenerPedidos();

const pedidosUsuario = pedidos.filter(

    pedido => pedido.usuarioDto.id === usuario.id

);

if (pedidosUsuario.length === 0) {

    contenedor.innerHTML = `
        <h2>No realizó ningún pedido.</h2>
    `;

} else {

    pedidosUsuario.forEach(pedido => {

        contenedor.innerHTML += `

            <article class="pedido">

                <h2>
                    Pedido #${pedido.id}
                </h2>

                <p>
                    Fecha:
                    ${new Date(pedido.fecha).toLocaleString()}
                </p>

                <p>
                    Estado:
                    ${pedido.estado}
                </p>

                <p>
                    Forma de pago:
                    ${pedido.formaPago}
                </p>

                <p>
                    Total:
                    $${pedido.total}
                </p>

                <h3>Productos</h3>

                <ul>

                    ${pedido.detalles.map(detalle => `
                        <li>
                            ${detalle.producto.nombre}
                            x${detalle.cantidad}
                            - $${detalle.subtotal}
                        </li>
                    `).join("")}

                </ul>

            </article>

            <hr>

        `;

    });

}