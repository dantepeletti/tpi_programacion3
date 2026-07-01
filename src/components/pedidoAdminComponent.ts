import type { IPedido } from "../types/IPedido.js";

export function renderPedidosAdmin(
    pedidos: IPedido[]
): void {

    const contenedor =
        document.querySelector<HTMLDivElement>("#listaPedidos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    pedidos.forEach(pedido => {

        contenedor.innerHTML += `
            <article class="pedido-admin">

                <h3>Pedido #${pedido.id}</h3>

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
                    Estado:
                    ${pedido.estado}
                </p>

                <p>
                    Pago:
                    ${pedido.formaPago}
                </p>

                <p>
                    Total:
                    $${pedido.total}
                </p>

            </article>

            <hr>
        `;

    });

}