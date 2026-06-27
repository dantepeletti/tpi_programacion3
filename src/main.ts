import { getCategorias } from "./services/categoriaService.js";
import { getProductos, getProductosPorCategoria } from "./services/productoService.js";

import { renderCategorias } from "./components/categoriaComponent.js";
import { renderProductos } from "./components/productoComponent.js";

async function iniciarAplicacion() {

    try {

        const categorias = await getCategorias();

        renderCategorias(
            categorias,
            async (idCategoria: number) => {

                const productos =
                    await getProductosPorCategoria(idCategoria);

                renderProductos(productos);

            }
        );

        const productos = await getProductos();

        renderProductos(productos);

    } catch (error) {

        console.error(
            "Error al iniciar la aplicación:",
            error
        );

    }

}

iniciarAplicacion();