import {getPedidos, editarPedido} from "../../services/pedidoService.js";
import {renderPedidosAdmin} from "../../components/pedidoAdminComponent.js";

async function actualizarVista(): Promise<void> {

    const pedidos =
        await getPedidos();

    renderPedidosAdmin(pedidos);

    agregarEventos();

}

function agregarEventos(): void {

    document
        .querySelectorAll(".btn-guardar-estado")
        .forEach(boton => {

            boton.addEventListener("click", async () => {

                const id =
                    Number(
                        boton.getAttribute("data-id")
                    );

                const pedidos =
                    await getPedidos();

                const pedido =
                    pedidos.find(
                        pedido =>
                            pedido.id === id
                    );

                if (!pedido) {

                    return;

                }

                const select =
                    document.querySelector<HTMLSelectElement>(
                        `.estado-pedido[data-id="${id}"]`
                    );

                if (!select) {

                    return;

                }

                pedido.estado =
                    select.value as
                    | "PENDIENTE"
                    | "EN_PREPARACION"
                    | "ENTREGADO";

                editarPedido(pedido);

                alert(
                    "Estado actualizado."
                );

                actualizarVista();

            });

        });

}

actualizarVista();