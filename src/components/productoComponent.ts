import type { IProducto } from "../types/IProducto.js";

export function renderProductos(productos: IProducto[]): void {

    const listaProductos = document.querySelector<HTMLElement>("#listaProductos");

    if (!listaProductos) return;

    listaProductos.innerHTML = "";

    productos.forEach((producto) => {

        listaProductos.innerHTML += `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
            </article>
        `;

    });
}