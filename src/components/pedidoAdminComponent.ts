import type { IPedido } from "../types/IPedido.js";

export function renderPedidosAdmin(
    pedidos: IPedido[]
): void {

    const contenedor =
        document.querySelector<HTMLDivElement>("#listaPedidos");

    if (!contenedor) {

        return;

    }

    contenedor.innerHTML = "";

    pedidos.forEach(pedido => {

        contenedor.innerHTML += `

            <article class="pedido-admin">

                <h3>

                    Pedido #${pedido.id}

                </h3>

                <p>

                    Cliente:

                    ${pedido.usuarioDto.nombre}

                    ${pedido.usuarioDto.apellido}

                </p>

                <p>

                    Fecha:

                    ${pedido.fecha}

                </p>

                <p>

                    Total:

                    $${pedido.total}

                </p>

                <p>

                    Forma de pago:

                    ${pedido.formaPago}

                </p>

                <label>

                    Estado

                </label>

                <select
                    class="estado-pedido"
                    data-id="${pedido.id}">

                    <option
                        value="PENDIENTE"
                        ${pedido.estado === "PENDIENTE"
                            ? "selected"
                            : ""}>
                        Pendiente
                    </option>

                    <option
                        value="EN_PREPARACION"
                        ${pedido.estado === "EN_PREPARACION"
                            ? "selected"
                            : ""}>
                        En preparación
                    </option>

                    <option
                        value="ENTREGADO"
                        ${pedido.estado === "ENTREGADO"
                            ? "selected"
                            : ""}>
                        Entregado
                    </option>

                </select>

                <button
                    class="btn-guardar-estado"
                    data-id="${pedido.id}">

                    Guardar estado

                </button>

            </article>

            <hr>

        `;

    });

}