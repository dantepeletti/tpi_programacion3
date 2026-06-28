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