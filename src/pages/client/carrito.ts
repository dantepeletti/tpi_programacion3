import { renderCarrito } from "../../components/carritoComponent.js";

import {
    obtenerCarrito,
    obtenerTotalCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
} from "../../services/carritoService.js";

function actualizarVista(): void {

    const carrito = obtenerCarrito();

    renderCarrito(carrito);

    const total =
        document.querySelector<HTMLHeadingElement>("#total");

    if (total) {

        total.textContent =
            `Total: $${obtenerTotalCarrito()}`;

    }

    agregarEventos();

}

function agregarEventos(): void {

    document.querySelectorAll(".btn-sumar")
        .forEach((boton) => {

            boton.addEventListener("click", () => {

                const id = Number(
                    boton.getAttribute("data-id")
                );

                aumentarCantidad(id);

                actualizarVista();

            });

        });

    document.querySelectorAll(".btn-restar")
        .forEach((boton) => {

            boton.addEventListener("click", () => {

                const id = Number(
                    boton.getAttribute("data-id")
                );

                disminuirCantidad(id);

                actualizarVista();

            });

        });

    document.querySelectorAll(".btn-eliminar")
        .forEach((boton) => {

            boton.addEventListener("click", () => {

                const id = Number(
                    boton.getAttribute("data-id")
                );

                eliminarProducto(id);

                actualizarVista();

            });

        });

}

const botonVaciar =
    document.querySelector<HTMLButtonElement>("#btn-vaciar");

botonVaciar?.addEventListener("click", () => {

    vaciarCarrito();

    actualizarVista();

});

const botonFinalizar =
    document.querySelector<HTMLButtonElement>("#btn-finalizar");

botonFinalizar?.addEventListener("click", () => {

    if (obtenerCarrito().length === 0) {

        alert("El carrito está vacío.");

        return;

    }

    alert("Compra realizada con éxito.");

    vaciarCarrito();

    actualizarVista();

});

actualizarVista();