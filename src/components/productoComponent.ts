import type { IProducto } from "../types/IProducto.js";
import{agregarProductoAlCarrito} from "../services/carritoService.js";

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
                <button
                    class="btn-agregar"
                    data-id="${producto.id}"
                    >
                    Agregar al carrito
                </button>
            </article>
        `;
    });

    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const id = Number(
                boton.getAttribute("data-id")
            );

            const producto = productos.find(
                p => p.id === id
            );

            if (!producto) return;

            agregarProductoAlCarrito(producto);

            alert("Producto agregado al carrito");
        });
    });
}