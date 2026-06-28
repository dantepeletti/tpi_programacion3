import { getCategorias } from "./services/categoriaService.js";
import { getProductos, getProductosPorCategoria, buscarProductos } from "./services/productoService.js";

import { renderCategorias } from "./components/categoriaComponent.js";
import { renderProductos } from "./components/productoComponent.js";

async function iniciarAplicacion() {

    try {

        const categorias = await getCategorias();

        renderCategorias(
            categorias,
            async (idCategoria) => {

                if (idCategoria === null) {

                    const productos = await getProductos();
                    renderProductos(productos);
                    return;

                }

                const productos =
                    await getProductosPorCategoria(idCategoria);

                renderProductos(productos);

            }
        );

        const productos = await getProductos();

        renderProductos(productos);

        const formularioBusqueda =
        document.querySelector<HTMLFormElement>("#formBusqueda");

        const inputBusqueda =
            document.querySelector<HTMLInputElement>("#busqueda");

        formularioBusqueda?.addEventListener("submit", async (event) => {

            event.preventDefault();

            const texto = inputBusqueda?.value.trim() ?? "";

            if (texto === "") {

                renderProductos(await getProductos());
                return;

            }

            const productosEncontrados =
                await buscarProductos(texto);

            renderProductos(productosEncontrados);

        });

    } catch (error) {

        console.error(
            "Error al iniciar la aplicación:",
            error
        );

    }

}

iniciarAplicacion();