import type { IProducto } from "../types/IProducto.js";
import type { ICarritoItem } from "../types/ICarritoItem.js";

import {
    guardarDatos,
    obtenerDatos
} from "../utils/localStorage.js";

const CARRITO_KEY = "carrito";

export function obtenerCarrito(): ICarritoItem[] {

    return obtenerDatos<ICarritoItem[]>(CARRITO_KEY) ?? [];

}

export function agregarProductoAlCarrito(
    producto: IProducto
): void {

    const carrito = obtenerCarrito();

    const itemExistente = carrito.find(
        item => item.producto.id === producto.id
    );

    if (itemExistente) {

        itemExistente.cantidad++;

    } else {

        carrito.push({
            producto,
            cantidad: 1
        });

    }

    guardarDatos(CARRITO_KEY, carrito);

}

export function obtenerTotalCarrito(): number {

    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, item) =>
            total + item.producto.precio * item.cantidad,
        0
    );

}

export function aumentarCantidad(
    idProducto: number
): void {

    const carrito = obtenerCarrito();

    const item = carrito.find(
        item => item.producto.id === idProducto 
    );

    if (item) {

        item.cantidad++;

    }

    guardarDatos(CARRITO_KEY, carrito);

}

export function disminuirCantidad(
    idProducto: number
): void {

    let carrito = obtenerCarrito();

    const item = carrito.find(
        item => item.producto.id === idProducto
    );

    if (item) {

        item.cantidad--;

        if (item.cantidad <= 0) {

            carrito = carrito.filter(
                item => item.producto.id !== idProducto
            );

        }

    }

    guardarDatos(CARRITO_KEY, carrito);

}

export function eliminarProducto(
    idProducto: number
): void {

    const carrito = obtenerCarrito().filter(
        item => item.producto.id !== idProducto
    );

    guardarDatos(CARRITO_KEY, carrito);

}

export function vaciarCarrito(): void {

    guardarDatos(CARRITO_KEY, []);

}