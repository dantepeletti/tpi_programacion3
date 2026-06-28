import { getCategorias } from "./services/categoriaService.js";
import { getProductos } from "./services/productoService.js";

import { renderCategorias } from "./components/categoriaComponent.js";
import { renderProductos } from "./components/productoComponent.js";

let categoriaSeleccionada: number | null = null;
let textoBusqueda = "";

import type { IProducto } from "./types/IProducto.js";

async function actualizarProductos(): Promise<void> {

    let productos: IProducto[] = await getProductos();

    if (categoriaSeleccionada !== null) {

        productos = productos.filter(
            producto => producto.categoria.id === categoriaSeleccionada
        );

    }

    if (textoBusqueda !== "") {

        productos = productos.filter(
            producto =>
                producto.nombre
                    .toLowerCase()
                    .includes(textoBusqueda.toLowerCase())
        );

    }

    renderProductos(productos);

}

async function iniciarAplicacion() {

    try {

        const categorias = await getCategorias();

        renderCategorias(
            categorias,
            async (idCategoria) => {

                categoriaSeleccionada = idCategoria;

                await actualizarProductos();
            }
        );

        await actualizarProductos();

        const formularioBusqueda =
        document.querySelector<HTMLFormElement>("#formBusqueda");

        const inputBusqueda =
            document.querySelector<HTMLInputElement>("#busqueda");

        formularioBusqueda?.addEventListener("submit", async (event) => {

            event.preventDefault();

            textoBusqueda = inputBusqueda?.value.trim() ?? "";

            await actualizarProductos();

        });

        } catch (error) {

        console.error(
            "Error al iniciar la aplicación:",
            error
        );

    }

}

iniciarAplicacion();