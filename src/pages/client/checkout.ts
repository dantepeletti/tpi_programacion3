import { obtenerCarrito } from "../../services/carritoService.js";

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