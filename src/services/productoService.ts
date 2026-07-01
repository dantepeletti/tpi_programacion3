import type { IProducto } from "../types/IProducto.js";
import { guardarDatos } from "../utils/localStorage.js";

export async function getProductos(): Promise<IProducto[]> {
    const response = await fetch("/data/productos.json");

    if (!response.ok) {
        throw new Error("No se pudieron cargar los productos.");
    }

    return await response.json();
}

const PRODUCTOS_KEY = "productos";

export function guardarProductos(
    productos: IProducto[]
): void {

    guardarDatos(PRODUCTOS_KEY, productos);

}

export async function obtenerProductosAdmin(): Promise<IProducto[]> {

    const productosStorage =
        localStorage.getItem(PRODUCTOS_KEY);

    if (productosStorage) {

        return JSON.parse(productosStorage);

    }

    const productos =
        await getProductos();

    guardarProductos(productos);

    return productos;

}

export async function eliminarProducto(
    id: number
): Promise<void> {

    const productos =
        await obtenerProductosAdmin();

    const nuevos =
        productos.filter(
            producto => producto.id !== id
        );

    guardarProductos(nuevos);

}

export async function agregarProducto(
    producto: IProducto
): Promise<void> {

    const productos =
        await obtenerProductosAdmin();

    productos.push(producto);

    guardarProductos(productos);

}

export async function editarProducto(
    productoEditado: IProducto
): Promise<void> {

    const productos =
        await obtenerProductosAdmin();

    const indice =
        productos.findIndex(
            producto =>
                producto.id === productoEditado.id
        );

    if (indice === -1) {

        return;

    }

    productos[indice] =
        productoEditado;

    guardarProductos(productos);

}