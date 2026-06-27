import { getCategorias } from "./services/categoriaService.js";
import { getProductos } from "./services/productoService.js";

import { renderCategorias } from "./components/categoriaComponent.js";
import { renderProductos } from "./components/productoComponent.js";

async function iniciarAplicacion() {

    try {

        const categorias = await getCategorias();
        const productos = await getProductos();

        renderCategorias(categorias);
        renderProductos(productos);

    } catch (error) {

        console.error("Error al iniciar la aplicación:", error);

    }

}

iniciarAplicacion();