import type { IProducto } from "../types/IProducto.js";

export function renderProductosAdmin(
    productos: IProducto[]
): void {

    const contenedor =
        document.querySelector<HTMLDivElement>("#listaProductos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        contenedor.innerHTML += `
            <article class="producto-admin">
                <h3>${producto.nombre}</h3>
                <p>
                    Precio:
                    $${producto.precio}
                </p>
                <p>
                    Stock:
                    ${producto.stock}
                </p>
                <button
                    class="btn-editar"
                    data-id="${producto.id}">
                    Editar
                </button>
                <button
                    class="btn-eliminar"
                    data-id="${producto.id}">
                    Eliminar
                </button>
            </article>
            <hr>
        `;
    });

}