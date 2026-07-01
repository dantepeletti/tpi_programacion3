import {
    obtenerCarrito,
    obtenerTotalCarrito,
    vaciarCarrito
} from "../../services/carritoService.js";

import { guardarPedido } from "../../services/pedidoService.js";

import { obtenerDatos } from "../../utils/localStorage.js";

import type { IPedido } from "../../types/IPedido.js";
import type { IUser } from "../../types/IUser.js";
import type { FormaPago } from "../../types/FormaPago.js";

const contenedor =
    document.querySelector<HTMLDivElement>("#detallePedido");

const carrito = obtenerCarrito();

if (contenedor) {

    let total = 0;

    carrito.forEach(item => {

        const subtotal =
            item.producto.precio * item.cantidad;

        total += subtotal;

        contenedor.innerHTML += `
            <article class="detalle-item">

                <h3>${item.producto.nombre}</h3>

                <p>
                    Cantidad:
                    ${item.cantidad}
                </p>

                <p>
                    Precio unitario:
                    $${item.producto.precio}
                </p>

                <p>
                    Subtotal:
                    $${subtotal}
                </p>

            </article>
        `;

    });

    contenedor.innerHTML += `
        <hr>

        <h2>Total: $${total}</h2>
    `;

}

const botonConfirmar =
    document.querySelector<HTMLButtonElement>("#btnConfirmar");

botonConfirmar?.addEventListener("click", () => {

    const usuario =
        obtenerDatos<IUser>("userData");

    if (!usuario) {

        alert("Debe iniciar sesión.");

        window.location.href =
            "/src/pages/auth/login.html";

        return;

    }

    const selectFormaPago =
    document.querySelector<HTMLSelectElement>("#formaPago");

    if (!selectFormaPago) {

        alert("Seleccione una forma de pago.");

        return;

    }

const formaPago: FormaPago =
    selectFormaPago.value as FormaPago;

    const pedido: IPedido = {

        id: Date.now(),

        fecha: new Date().toISOString(),

        estado: "PENDIENTE",

        total: obtenerTotalCarrito(),

        formaPago,

        detalles: carrito.map(item => ({

            cantidad: item.cantidad,

            subtotal:
                item.producto.precio * item.cantidad,

            producto: item.producto

        })),

        usuarioDto: {

            id: usuario.id,

            nombre: usuario.nombre,

            apellido: usuario.apellido,

            mail: usuario.mail,

            celular: usuario.celular,

            rol: usuario.rol

        }

    };

    guardarPedido(pedido);

    vaciarCarrito();

    alert("Pedido realizado correctamente.");

    window.location.href =
        "/src/pages/client/pedidos.html";

});