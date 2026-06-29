import type { ICarritoItem } from "../types/ICarritoItem.js";

export function renderCarrito(carrito: ICarritoItem[]): void {

    const contenedor =
        document.querySelector<HTMLElement>("#contenedor-carrito");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    carrito.forEach((item) => {

        contenedor.innerHTML += `
            <article class="card-carrito">

                <img
                    src="${item.producto.imagen}"
                    alt="${item.producto.nombre}"
                >

                <h3>${item.producto.nombre}</h3>

                <p>${item.producto.descripcion}</p>

                <p>$${item.producto.precio}</p>

                <p>Cantidad: ${item.cantidad}</p>

                <div class="acciones-carrito">

                    <button
                        class="btn-sumar"
                        data-id="${item.producto.id}"
                    >
                        +
                    </button>

                    <button
                        class="btn-restar"
                        data-id="${item.producto.id}"
                    >
                        -
                    </button>

                    <button
                        class="btn-eliminar"
                        data-id="${item.producto.id}"
                    >
                        Eliminar
                    </button>

                </div>

            </article>
        `;

    });

}