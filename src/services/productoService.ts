import type { IProducto } from "../types/IProducto.js";

export async function getProductos(): Promise<IProducto[]> {
    const response = await fetch("/data/productos.json");

    if (!response.ok) {
        throw new Error("No se pudieron cargar los productos.");
    }

    return await response.json();
}

export async function getProductosPorCategoria(idCategoria: number): Promise<IProducto[]> {

    const productos = await getProductos();

    return productos.filter(
        (producto) => producto.categoria.id === idCategoria
    );

}